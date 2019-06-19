import React from 'react';
import { ipcRenderer } from 'electron';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import SplitView, { SplitViewPane } from 'components/react-uwp/SplitView';
import TextBox from 'components/react-uwp/TextBox';
import Button from 'components/react-uwp/Button';

import {
  MODULE_NAME,
} from './constants';
import DynamicView from './src/Dynamic2';

import reducer from './reducer';
import saga from './saga';

/* import { timingSafeEqual } from 'crypto'; */

import CommandBar from "components/react-uwp/CommandBar";
import AppBarButton from "components/react-uwp/AppBarButton";
import AppBarSeparator from "components/react-uwp/AppBarSeparator";
import { selectCategory, selectAction, updateRsdData } from './actions';
import { makeSelectCategory, makeSelectAction, makeSelectSensors, makeSelectInterval, makeSelectRsdData } from './selectors';

import { parseRsdRawData } from "../../ShortcutBar/MapParser/parser";
import { makeSelectRegConfig, makeSelectRsdRawFormat } from "../../ShortcutBar/MapParser/selectors";
import { isArray } from 'util';

const ControlBar = (props)=> {
  const groupStyle: React.CSSProperties = {
    margin: "30px 0",
    flexDirection: "row",
  };
  const commandBarStyle: React.CSSProperties = {
    margin: "30px 0"
  };

  return (
    <CommandBar
      background="transparent"
      content="Now Playing..."
      primaryCommands={
        props.buttons.map(name=>
          <AppBarButton icon={name} label={name} onClick={()=>props.onControlButtonClick(name)}/>  
        )
      }
      style={commandBarStyle}
      flowDirection="row"
    />
  );
}

const baseStyle: React.CSSProperties = {
  margin: '10px 0',
};

export interface GraphicViewState {
  param?: Array;
  btnStatus?: Array;
  action?: string;
  sensorData?: Object;
}

export class GraphicView extends React.Component<{}, GraphicViewState> {
  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  state: GraphicViewState = {
    param: [],
    btnStatus:[],
    action: 'Stop',
    sensorData: {},
  };

  constructor() {
    super();

    this.controlBarIcons = [
      ["Play", "Pause"],  //Released, Pressed
      ["Stop"]
    ]

    this.handleButtonClick = this.handleButtonClick.bind(this);

    this.commandStack = {}; //keyid: [command groups]
    this.commandCallback = undefined;

    this.thread = undefined;
  }

  range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
  }

  sensorCount() {
    //console.log("<GraphicView> sensorCount regcfg",typeof(this.props.regcfg), this.props.regcfg);
    return this.props.regcfg.hasOwnProperty("DEF_NUM_SENSORS")?
      this.props.regcfg.DEF_NUM_SENSORS : 1;
  }

  getSensorsTraceList() {
    //console.log("<GraphicView> getSensorsTraceList sensors",typeof(this.props.sensors), this.props.sensors);
    const sensors = Array.from(this.props.sensors);

    if (sensors.length == 0) {
      return this.range(this.sensorCount());
    }else {
      return sensors;
    }
  }

  getSensorCates(keyid) {
    const cates = this.props.category.toObject();
      if (cates.hasOwnProperty(keyid))
        return cates.keyid;
      else
        return cates.default;
  }

  getCateCommandIndex(cate) {
    for (let i = 0; i < this.commandStack.length; i++) {
      if (this.commandStack.members.includes(cate))
        return i;
    }

    return -1;
  }

  updateSensorData(keyid, rsdData) {
    const updateRsdData = (original, rsdData) => {
      if (orignal == undefined)
        original = {};

      for (cate in rsdData) {
        if (original[cate] == undefined)
          orignal[cate] = [];
        
        original.cate.push(rsdData[cate]);
      }

      return original;
    }

    const updateKey = (original, keyid, rsdData) => {
      if (orignal == undefined)
        original = {[keyid]: {}};
      
        original[keyid] = updateRsdData(original.keyid, rsdData);

        return original;
    }

    const data = updateKey(this.state.sensorData, keyid, rsdData);
    this.setState({"sensorData": data});
  }

  encodeKey(keyid) {
    const cates = this.getSensorCates(keyid);
    let group = [];
    
    cates.forEach(cate => {
      const rsdFormats = this.props.rsdRawFormat[cate];
      if (isArray(rsdFormats)) {
        rsdFormats.forEach((data, i) => {
          const { addr, size, members, children } = data;
          group.push({
            op: "read mem",
            module: MODULE_NAME,
            keyid,
            groupid: i,
            target: cate,
            addr: addr + size* keyid, 
            size, 
            //value: undefined, //Not set 'value', untill prepared to send out command
            members, 
            children,
          });
        }); 
      }
    });

    //console.log("<GraphicView> encodeKey", group);
    return group;
  }

  enbarkCommand() {
    if (Object.keys(this.commandStack).length)
      return;    
    /*
    if (!this.commandInProcessing())
      return;*/

    if (this.state.action != 'Play')
      return;

    const sensors = this.getSensorsTraceList();
    console.log("<GraphicView> enbarkCommand", sensors);

    sensors.forEach((keyid) => {
      this.commandStack[keyid] = this.encodeKey(keyid);
    });
  }

  emmitCommand() {
    //console.log("<GraphicView> emmitCommand stack", this.commandStack);

    Object.values(this.commandStack).some((group)=>{
      return group.some((cmd) => {
        if (cmd['value'] == undefined) {
          cmd['value'] = undefined; // Just a mark

          console.log("<GraphicView> emmit-command", cmd);
          ipcRenderer.send('updi-cmd', cmd);
          
          return true;
        }
      });
    });
  }

  threadEmmitCommand() {
    if (this.thread)
      return;

    this.thread = new Promise((resolve, reject) => {
      setTimeout(() => {
        this.enbarkCommand();
        this.emmitCommand();

        resolve('Emmitted');
      }, this.props.interval);
    });

    this.thread.then((success)=> {
      console.log("<GraphicView> emmit success:", success);
      this.thread = undefined;
    }).catch((reason)=> {
      console.log("<GraphicView> emmit failed:", reason);
      this.thread = undefined;
    });
  }

  cleanCommand() {
    this.commandStack = {};
  }

  processCommandResult(command, result) {
    if (result == undefined)  //Fixme: there should notice the error
      return;

    const group = this.commandStack[command.keyid];
    if (isArray(group)) {
      group[command.groupid].value = result;
      if (group.every((member)=> member['value'] != undefined)) {
        const rsdData = parseRsdRawData(group);
        if (rsdData) {
          this.updateSensorData(command.keyid, rsdData);
          this.props.onRsdDataUpdate(rsdData);
        }
        delete this.commandStack[command.keyid];
      }

      if (Object.keys(this.commandStack).length)
        this.emmitCommand();
      else
        this.threadEmmitCommand();
    }
  }

  setCommandCallback() {
    
    if (this.commandCallback)
      return;

    console.log("<GraphicView> setCommandCallback");

    this.commandCallback = ((event, cmd, result) => {
      if (cmd['module'] != MODULE_NAME)
        return;
      
      //console.log("<GraphicView> commandCallback", cmd, result);

      this.processCommandResult(cmd, result);
    }).bind(this);

    ipcRenderer.on('updi-cmd-return', this.commandCallback);
  }

  disableCommandCallback() {
    if (!this.commandCallback)
      return;
  
    console.log("<GraphicView> disableCommandCallback");

    ipcRenderer.removeListener('updi-cmd-return', this.commandCallback)
    this.commandCallback = undefined;
  }

  commandInProcessing() {
    return !!this.commandCallback;
  }

  queryCategoryData() {
    const action = this.state.action;

    if (action == 'Play') {
      this.setCommandCallback();
      this.enbarkCommand();
      this.emmitCommand();
    }else if (action == 'Pause') {
      //this.setCommandCallback();
    }else {
      this.disableCommandCallback();
      this.cleanCommand();
    }
  }

  handleButtonClick(name) {
    this.controlBarIcons.some((icons, i)=>{
      if (icons.includes(name)) {
        let newStatus;

        if (name == 'Stop') {
          newStatus = this.state.btnStatus.map(()=>0);
        }else {
          newStatus = this.state.btnStatus.slice(0);
          if (!newStatus[i]) {
            newStatus[i] = 0;
          }
          newStatus[i] = (newStatus[i] + 1) % this.controlBarIcons.length;
        }

        this.setState({'action': name, 'btnStatus': newStatus}, ()=>this.queryCategoryData());
        console.log(`<GraphicView> button ${name}, state ${this.state.btnStatus[i]} => ${newStatus[i]}`);
        
        return true;
      }
    })
  }

  getControlButtonList() {
    let buttons=[];

    for (let i = 0; i < this.controlBarIcons.length; i++) {
      let curr = this.state.btnStatus[i];
      if (!curr)  
        curr = 0; //make undefined to zero

      curr = curr % this.controlBarIcons[i].length;
      buttons.push(this.controlBarIcons[i][curr]);
    }
  
    return buttons;
  }

  render() {
    const { theme } = this.context;

    const baseStyle: React.CSSProperties = {
      background: theme.useFluentDesign ? theme.listLow : theme.chromeLow,
      margin: "10px 0",
      width: "100%",
    };

    console.log("<GraphicView> render:", this.props, this.state);

    return (
      <div style={{...baseStyle}}>
        <DynamicView sensorData={this.state.sensorData} category="delta"/>
        <ControlBar buttons={this.getControlButtonList()} onControlButtonClick={this.handleButtonClick} />
      </div>
    );
  }
}

GraphicView.propTypes = {
};

export function mapDispatchToProps(dispatch) {
  return {
    onCategorySelect: (cates)=>dispatch(selectCategory(cates)),
    onActionSelect: (act)=>dispatch(selectAction(act)),
    onRsdDataUpdate: (data)=>dispatch(updateRsdData(data)),
  };
};

const mapStateToProps = createStructuredSelector({
  category: makeSelectCategory(),
  currentAction: makeSelectAction(),
  rsdRawFormat: makeSelectRsdRawFormat(),
  rsdData: makeSelectRsdData(),
  regcfg: makeSelectRegConfig(),
  sensors: makeSelectSensors(),
  interval: makeSelectInterval(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: MODULE_NAME, reducer });
const withSaga = injectSaga({ key: MODULE_NAME, saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(GraphicView);

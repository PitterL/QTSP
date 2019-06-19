import React from 'react';
import { ipcRenderer } from 'electron';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import Button from 'components/react-uwp/Button';

import { MODULE_NAME } from './constants';

import reducer from './reducer';
import saga from './saga';
import { makeSelectFilePath, makeSelectRelativeDir, makeSelectDataStrucure, makeSelectRegAddress, makeSelectRegConfig } from './selectors';
import { MapfileParser, HeaderFileParser, getRsdRawFormat, DataStructureParser} from './parser';
import { openFile, updateRegAddr, updateRegCfg, updateRsdFormat } from  './actions';

/*------------------------*/

import ListView, { ListViewProps } from "react-uwp/ListView";
import Separator from "react-uwp/Separator";
import CheckBox from "react-uwp/CheckBox";
import Toggle from "react-uwp/Toggle";
import Icon from "react-uwp/Icon";

const baseStyle: React.CSSProperties = {
  margin: "10px 10px 10px 0",
  height: "300px",
  overflowY: "auto",
};
function VaribleCheckList(props) {
  return (
    <ListView
      listSource={[
        {
          itemNode: <p>Gloable Varibles</p>
        }, 
        {
          itemNode: <Separator />,
          disabled: true
        }, 
        ...Object.keys(props.list).sort().map((k, i) => (
          <span key={`${i}`}>
            <span>{k}</span>
            <Toggle background="none" style={{ float: "right" }} />
          </span>
        )),
      ]}
      style={baseStyle}
    />
  );
}
/*-----------------------*/

/*
const baseStyle: React.CSSProperties = {
  margin: '10px 0',
};
*/
export interface MapParserState {
  param?: Array;
}

export class MapParser extends React.Component<{}, MapParserState> {
  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  state: MapParserState = {
    param: [],
  };

  constructor(props) {
    super(props);

    this.datastruct = new DataStructureParser();

    this.handleDrop.bind(this);
    this.handleDragOver.bind(this);
    this.handleOpenFile.bind(this);
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    for (const f of e.dataTransfer.files) {
      console.log('File(s) you dragged here: ', f.path);
    }
  }

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();

    console.log('File(s) you dragover', e);
  }

  handleOpenFile() {
    ipcRenderer.once('openFile-resp', (event, {selectPath, data}) => {
      if (!selectPath || !data)
        return;
  
      const filetype = selectPath.split('.').pop();
      console.log(`<MapParser> openFile event:${event}, selectPath: ${selectPath}, type: ${filetype}`); //return {data, path} obj
      
      if (filetype == 'map') {
        const parser = new MapfileParser();
        const regaddr = parser.parse(data);
        const formats = getRsdRawFormat(regaddr, this.datastruct.ds);

        console.log("<MapParser> rsd format:", formats);

        this.props.onUpdateRegAddr(regaddr);
        this.props.onUpdateRsdRawFormat(formats);
        this.props.onSelectFile(selectPath);
      }else if (filetype == 'h') {
        const parser = new HeaderFileParser();
        const regcfgs = parser.parse(data);

        console.log("<MapParser> reg cfgs:", regcfgs);

        this.props.onUpdateRegCfg(regcfgs);
        this.props.onSelectFile(selectPath);
      }else {
        console.log("<MapParser> Unknown file:", selectPath);
      }
    });
    ipcRenderer.send('openFile', this.props.path);
  }

  render() {
    const baseStyle: React.CSSProperties = {
      margin: '10px 10px 10px 0',
      height: 'auto',
      //display: 'flex',
      //"flex-direction": 'column'
    };

    console.log('<MapParser> render:', this.props, this);

    return (
      <div
        id="holder"
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
        style={baseStyle}
      >
        <div> {this.props.path || 'Drag your file here'} </div>
        <Button
          style={baseStyle}
          onClick={() => this.handleOpenFile()}
        >
          Open
        </Button>
        <VaribleCheckList list={this.props.regaddr}/>
      </div>
    );
  }
}

MapParser.propTypes = {
  path: PropTypes.string,
  relativeDir: PropTypes.object,
  regaddr: PropTypes.object,
  regcfg: PropTypes.object,

  onSelectFile: PropTypes.func,
  onUpdateRegAddr: PropTypes.func,
  onUpdateRegCfg: PropTypes.func,
  onUpdateRsdRawFormat: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSelectFile: path => dispatch(openFile(path)),
    onUpdateRegAddr: data => dispatch(updateRegAddr(data)),
    onUpdateRegCfg: data => dispatch(updateRegCfg(data)),
    onUpdateRsdRawFormat: data=> dispatch(updateRsdFormat(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  path: makeSelectFilePath(),
  relativeDir: makeSelectRelativeDir(),

  //datastruct: makeSelectDataStrucure(),
  regaddr: makeSelectRegAddress(),
  regcfg: makeSelectRegConfig(),
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
)(MapParser);

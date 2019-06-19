import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

/*
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
*/
import SplitView, { SplitViewPane } from 'components/react-uwp/SplitView';
import TextBox from 'components/react-uwp/TextBox';
import Button from 'components/react-uwp/Button';

import {
  MODULE_NAME,
  PLACEHOLDER_COMPORT_NAME,
  PLACEHOLDER_BAURATE_NAME,
  PLACEHOLDER_DEVICE_NAME,
} from './constants';
import { selectParam, openPort, closePort } from './actions';
import {
  makeSelectComport,
  makeSelectBaudrate,
  makeSelectDevice,
} from './selectors';
import { makeSelectShortcutIcon } from '../ShortcutBar/selectors';

import reducer from './reducer';
import saga from './saga';

/* import { timingSafeEqual } from 'crypto'; */

const baseStyle: React.CSSProperties = {
  margin: '10px 0',
};

const InputTextBox = props => {
  const placeholder = props.value || props.name;
  return (
    <TextBox
      style={baseStyle}
      placeholder={placeholder}
      onChangeValue={v => {
        props.onSelectParam(props.name, v);
      }}
    />
  );
};

InputTextBox.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onSelectParam: PropTypes.func,
};

export interface ContentZoneState {
  param?: Array;
}

export class ContentZone extends React.Component<{}, ContentZoneState> {
  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  state: ContentZoneState = {
    param: [],
  };

  ContentZone() {
    this.processConnect.bind(this);
  }

  processConnect(skip = false) {
    const param = [this.props.comport, this.props.baudrate, this.props.device];

    if (!param.every(v => !!v)) return;

    if (!skip) {
      if (_.isEqual(param, this.state.param)) return;
    }

    this.props.onSubmitForm();
    this.setState({ param });
  }

  render() {
    const params = {
      [PLACEHOLDER_COMPORT_NAME]: this.props.comport,
      [PLACEHOLDER_BAURATE_NAME]: this.props.baudrate,
      [PLACEHOLDER_DEVICE_NAME]: this.props.device,
    };
    const submitValid = Object.values(params).every(v => !!v);

    console.log('<ContentZone> props', this.props);
    console.log('<ContentZone> state', this.state);
    console.log('<ContentZone> params', params);

    return (
      <SplitView
        defaultExpanded={this.props.expanded}
        displayMode="compact"
        onClosePane={() => {
          console.log('<ContentZone> SplitViewPane closed');
          this.processConnect();
        }}
        style={{
          width: '85%',
          margin: '20px auto',
          // height: 640
        }}
      >
        <div>ContentZone</div>

        <SplitViewPane>
          {Object.keys(params).map((k, i) => (
            <InputTextBox
              key={i}
              name={k}
              value={params[k].toString()}
              onSelectParam={this.props.onSelectParam}
            />
          ))}

          <Button
            disabled={!submitValid}
            style={{ position: 'absolute', right: '10%' }}
            onClick={() => this.processConnect(true)}
          >
            Connect
          </Button>
        </SplitViewPane>
      </SplitView>
    );
  }
}

ContentZone.propTypes = {
  comport: PropTypes.string,
  baudrate: PropTypes.number,
  device: PropTypes.string,
  onSubmitForm: PropTypes.func,
  onSelectParam: PropTypes.func,
  expanded: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSelectParam: (n, v) => dispatch(selectParam(n, v)),
    onSubmitForm: () => dispatch(openPort()),
    onCancel: () => {
      dispatch(closePort());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  /*
  repos: makeSelectRepos(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  */

  comport: makeSelectComport(),
  baudrate: makeSelectBaudrate(),
  device: makeSelectDevice(),

  expanded: makeSelectShortcutIcon('setting'),
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
)(ContentZone);

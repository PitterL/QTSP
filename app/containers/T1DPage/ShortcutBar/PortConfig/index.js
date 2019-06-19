import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
/* import { timingSafeEqual } from 'crypto'; */

import SplitView, { SplitViewPane } from 'components/react-uwp/SplitView';
import TextBox from 'components/react-uwp/TextBox';
import Button from 'components/react-uwp/Button';

import reducer from './reducer';
import saga from './saga';

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

export interface PortConfigState {
  param?: Array;
}

export class PortConfig extends React.Component<{}, PortConfigState> {
  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  state: PortConfigState = {
    param: [],
  };

  constructor() {
    super();
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
      [PLACEHOLDER_COMPORT_NAME]: this.props.comport || '',
      [PLACEHOLDER_BAURATE_NAME]: this.props.baudrate || '',
      [PLACEHOLDER_DEVICE_NAME]: this.props.device || '',
    };
    const submitValid = Object.values(params).every(v => !!v);

    console.log('<PortConfig> props', this.props);
    console.log('<PortConfig> state', this.state);
    console.log('<PortConfig> params', params);

    return (
      <div>
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
      </div>
    );
  }
}

PortConfig.propTypes = {
  comport: PropTypes.string,
  baudrate: PropTypes.number,
  device: PropTypes.string,

  onSubmitForm: PropTypes.func,
  onSelectParam: PropTypes.func,
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
  comport: makeSelectComport(),
  baudrate: makeSelectBaudrate(),
  device: makeSelectDevice(),
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
)(PortConfig);

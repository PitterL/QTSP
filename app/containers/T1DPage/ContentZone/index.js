import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// import _ from 'lodash';

import injectReducer from 'utils/injectReducer';
// import injectSaga from 'utils/injectSaga';
/* import { timingSafeEqual } from 'crypto'; */

import SplitView, { SplitViewPane } from 'components/react-uwp/SplitView';

import reducer from './reducer';
// import saga from './saga';

import { MODULE_NAME } from './constants';

import { makeSelectShortcutIcon} from '../ShortcutBar/selectors';
import { makeSelectNavigatorIcon} from '../NavigatorBar/selectors';

//import MapParser from '../ShortcutBar/MapParser'
import GraphicView from '../NavigatorBar/GraphicView'

const SettingView = (cls) => {
  const view = cls ?
    React.createElement(cls) : <div />;

  return React.createElement(SplitViewPane, {}, view/*<MapParser />*/);
}

const ContentView = (cls) => {
  const view = cls ?
    React.createElement(cls) : <div>ContentZone</div>;

  return view;
}

export interface ContentZoneState {
  param?: Array;
}

export class ContentZone extends React.Component<{}, ContentZoneState> {
  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  state: ContentZoneState = {
    param: [],
  };

  render() {
    console.log('<ContentZone> props', this.props);
    const settingView = SettingView(this.props.shortcutIcon.class);
    const contentView = ContentView(/*this.props.navigatorIcon.class*/GraphicView);
    return (
      <SplitView
        defaultExpanded={this.props.shortcutIcon.value}
        displayMode="compact"
        onClosePane={() => {
          console.log('<ContentZone> SplitViewPane closed');
        }}
        style={{
          width: '85%',
          margin: '20px auto',
          // height: 640
        }}
      >
        {contentView}
        {settingView}
      </SplitView>
    );
  }
}

ContentZone.propTypes = {
  shortcutIcon: PropTypes.object,
  navigatorIcon: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {};
}

const mapStateToProps = createStructuredSelector({
  shortcutIcon: makeSelectShortcutIcon(),
  navigatorIcon: makeSelectNavigatorIcon(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: MODULE_NAME, reducer });
// const withSaga = injectSaga({ key: MODULE_NAME, saga });

export default compose(
  withReducer,
  // withSaga,
  withConnect,
)(ContentZone);

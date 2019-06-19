import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import NavigationView from 'components/react-uwp/NavigationView';
import SplitViewCommand from 'components/react-uwp/SplitViewCommand';
import { SplitViewPane } from 'components/react-uwp/SplitView';

import injectReducer from 'utils/injectReducer';
import { clickIcon } from './actions';
import reducer from './reducer';
import { makeSelectNavigatorIcon } from './selectors';

import InfoPanel from './InfoPanel';
import GraphicView from './GraphicView';
import TunePanel from './TunePanel';

import {
  MODULE_NAME,
  INFO_ICON,
  GRAPHIC_ICON,
  TUNE_ICON
} from './constants';

export class NavigatorBar extends React.Component<React.HTMLAttributes<HTMLDivElement>,> {
  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  render() {
    const items = [
      { name: INFO_ICON, icon: '\uE716', label:'Information', class: InfoPanel },
      { name: GRAPHIC_ICON, icon: 'WebcamLegacy', label: 'Graphic View', class: GraphicView },
      { name: TUNE_ICON, icon:"PrintLegacy", label: 'Tunning', class:TunePanel },
    ];

    const navigationTopNodes =
      items.map(item => {
        return <SplitViewCommand 
          icon={item.icon} 
          label={item.label} 
          onClick={()=>{
            console.log("<NavigatorBar> onClick", item.label);
            this.props.onClickIcon(item);
          }}/>  
      });

    const navigationBottomNode = [
      <SplitViewCommand label="Settings" icon={'\uE713'} />,
      <SplitViewCommand label="CalendarDay" icon={'\uE161'} />,
    ];

    const { theme } = this.context;
    const rootStyles = theme.prefixStyle({
      display: 'flex',
      flexDirection: 'column',
    });

    return (
      <div>
        <NavigationView
          style={rootStyles}
          pageTitle="San Francisco"
          displayMode="compact"
          autoResize={false}
          background={theme.listLow}
          initWidth={48}
          navigationTopNodes={navigationTopNodes}
          navigationBottomNodes={navigationBottomNode}
          focusNavigationNodeIndex={3}
        >
          <SplitViewPane />
        </NavigationView>
      </div>
    );
  }
}

NavigatorBar.propTypes = {
  onClickIcon: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onClickIcon: item => dispatch(clickIcon(item)),
  };
}

const mapStateToProps = createStructuredSelector({
  navigatorIcon: makeSelectNavigatorIcon(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: MODULE_NAME, reducer });

export default compose(
  withReducer,
  withConnect,
)(NavigatorBar);

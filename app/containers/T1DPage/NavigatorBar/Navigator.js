import React from 'react';
import PropTypes from 'prop-types';

import NavigationView from 'components/react-uwp/NavigationView';
import SplitViewCommand from 'components/react-uwp/SplitViewCommand';
import { SplitViewPane } from 'components/react-uwp/SplitView';

export default class SimpleExample extends React.Component<
  React.HTMLAttributes<HTMLDivElement>,
> {
  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  render() {
    const navigationTopNodes = [
      <SplitViewCommand icon={'\uE716'} />,
      <SplitViewCommand label="Print" icon="PrintLegacy" />,
    ];

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

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import FloatNav from 'components/react-uwp/FloatNav';
import IconButton from 'components/react-uwp/IconButton';

import injectReducer from 'utils/injectReducer';
import { clickIcon } from './actions';
import reducer from './reducer';
import { makeSelectShortcutIcon } from './selectors';

// import {GraphicView} from './GraphicView'
import PortConfig from './PortConfig';
import MapParser from './MapParser';

import {
  MODULE_NAME,
  SETTING_ICON,
  GRAPHIC_ICON,
  PARSE_ICON,
} from './constants';

export class ShortcutBar extends React.Component {
  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  render() {
    const items = [
      { name: SETTING_ICON, content: 'SettingsLegacy', class: PortConfig },
      { name: PARSE_ICON, content: 'WebcamLegacy', class: MapParser },
      // {name:GRAPHIC_ICON, content:"RatingStarFillReducedPaddingHTMLLegacy", class:GraphicView},
    ];

    return (
      <FloatNav
        style={{ margin: '20px 0' }}
        isFloatRight={false}
        expandedItems={items.map(item => (
          {
            iconNode:
              <IconButton 
                hoverStyle={{}} 
                activeStyle={{}}
                onClick={() => {
                  this.props.onClickIcon(item);
                }}>
                  {item['content']}
              </IconButton>,
          }
        ))}
        onFocusItem={(itemIndex?: number) => {
          //console.log('<ShortcutBar> icon click index', itemIndex);
        }}
      />
    );
  }
}

ShortcutBar.propTypes = {
  onClickIcon: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onClickIcon: item => dispatch(clickIcon(item)),
  };
}

const mapStateToProps = createStructuredSelector({
  shortcutIcon: state => makeSelectShortcutIcon(state),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: MODULE_NAME, reducer });

export default compose(
  withReducer,
  withConnect,
)(ShortcutBar);

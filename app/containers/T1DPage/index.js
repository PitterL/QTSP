/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

/* eslint-disable react/prefer-stateless-function */
import {
  Theme as UWPThemeProvider,
  getTheme,
} from 'components/react-uwp/Theme';
import backgroundImg from 'images/blurBackground/jennifer-bailey-10753.jpg';

import ShortcutBar from './ShortcutBar';
import NavigatorBar from './NavigatorBar';
import ContentZone from './ContentZone';

import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import reducer from './reducer';
import saga from './saga';

export class Touch1DPage extends React.Component {
  render() {
    const theme = getTheme({
      themeName: 'dark', // set custom theme
      accent: '#0078D7', // set accent color
      useFluentDesign: true, // sure you want use new fluent design.
      desktopBackgroundImage: backgroundImg, // set global desktop background image
      useInlineStyle: true,
    });

    const styleVetrical = theme.prefixStyle({
      display: 'flex',
      flexDirection: 'row',
      height: '100%',
    });

    return (
      <UWPThemeProvider theme={theme}>
        <div style={styleVetrical}>
          <NavigatorBar />
          <ContentZone />
          <ShortcutBar />
        </div>
      </UWPThemeProvider>
    );
  }
}

/*
Touch1DPage.propTypes = {

};
*/

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  // repos: makeSelectRepos(),
  // username: makeSelectUsername(),
  // loading: makeSelectLoading(),
  // error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Touch1DPage);

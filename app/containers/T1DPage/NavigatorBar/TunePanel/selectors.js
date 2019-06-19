/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { MODULE_NAME } from './constants';

const root = state => state.get(MODULE_NAME, initialState);

export const makeSelectFilePath = () =>
  createSelector(root, state => state.get('path'));

export const makeSelectRelativeDir = () =>
  createSelector(root, state => {return {
    dirTouchHeader: state.get('dirTouchHeader'),
    dirHexToWorkplace: state.get('dirToWorkplace'),
  }});

export const makeSelectRegConfig = () =>
  createSelector(root, state => state.get('regcfg'));

export const makeSelectRegAddress = () =>
  createSelector(root, state => state.get('regaddr'));

/**
 * Shortcut selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { MODULE_NAME } from './constants';

const root = state => state.get(MODULE_NAME, initialState);

export const makeSelectNavigatorIcon = () => createSelector(root, state => ({
  name: state.get('item').name,
  class: state.get('item').class,
}));
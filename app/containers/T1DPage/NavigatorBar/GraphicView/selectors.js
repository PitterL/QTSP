/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import {
  MODULE_NAME,
} from './constants';

const root = state => state.get(MODULE_NAME, initialState);

export const makeSelectCategory = () =>
  createSelector(root, state => state.get('category'));

export const makeSelectAction = () =>
  createSelector(root, state => state.get('action'));

export const makeSelectRsdData = () =>
  createSelector(root, state => state.get('rsdData'));

export const makeSelectSensors = () =>
  createSelector(root, state => state.get('sensors'));

export const makeSelectInterval = () =>
  createSelector(root, state => state.get('interval'));
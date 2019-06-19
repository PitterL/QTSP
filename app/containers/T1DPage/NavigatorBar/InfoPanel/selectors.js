/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';
import {
  MODULE_NAME,
  PLACEHOLDER_COMPORT_NAME,
  PLACEHOLDER_BAURATE_NAME,
  PLACEHOLDER_DEVICE_NAME,
} from './constants';

const root = state => state.get(MODULE_NAME, initialState);

const makeSelectComport = () =>
  createSelector(root, state => state.get(PLACEHOLDER_COMPORT_NAME));

const makeSelectBaudrate = () =>
  createSelector(root, state => state.get(PLACEHOLDER_BAURATE_NAME));

const makeSelectDevice = () =>
  createSelector(root, state => state.get(PLACEHOLDER_DEVICE_NAME));

export { makeSelectComport, makeSelectBaudrate, makeSelectDevice };

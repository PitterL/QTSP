/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  PLACEHOLDER_COMPORT_NAME,
  PLACEHOLDER_BAURATE_NAME,
  PLACEHOLDER_DEVICE_NAME,
  SET_COMPORT,
  SET_BAUDRATE,
  SELECT_DEVICE,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  hardware: 'updi',
  [PLACEHOLDER_COMPORT_NAME]: '',
  [PLACEHOLDER_BAURATE_NAME]: 115200,
  [PLACEHOLDER_DEVICE_NAME]: 'tiny816',
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_COMPORT:
      return state.set(PLACEHOLDER_COMPORT_NAME, action.value.toUpperCase());
    case SET_BAUDRATE:
      return state.set(PLACEHOLDER_BAURATE_NAME, Number(action.value));
    case SELECT_DEVICE:
      return state.set(PLACEHOLDER_DEVICE_NAME, action.value.toLowerCase());
    default:
      return state;
  }
}

export default reducer;

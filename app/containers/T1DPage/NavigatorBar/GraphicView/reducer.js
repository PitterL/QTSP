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
  SELECT_CATEGORY,
  SELECT_ACTION,
  UPDATE_RSD_DATA,
} from './constants';

// The initial state of the App
export const initialState = fromJS({
  category: {default: ['delta']},
  action: 'stop',
  //rsdRawFormat: {},
  rsdData: {},
  sensors: [],
  interval: 5000, //ms
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return state.set('category', action.value);
    case SELECT_ACTION:
      return state.set('action', action.value);
    case UPDATE_RSD_DATA:
      return state.set('rsdData', action.value);
    default:
      return state;
  }
}

export default reducer;

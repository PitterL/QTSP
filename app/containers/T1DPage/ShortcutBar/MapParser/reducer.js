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

import { OPEN_FILE, UPDATE_REGADDR, UPDATE_REGCFG, UPDATE_RSD_FORMAT } from './constants';

// The initial state of the App
export const initialState = fromJS({
  path: '',
  data: '',
  regcfg: {}, // "touch.h" description
  regaddr: {},  // ".map" description
  dirToWorkplace: '../../',
  dirTouchHeader: 'qtouch/qtouch.h',
  rsdRawFormat: {},
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_FILE:
      return state.set('path', action.path);
    case UPDATE_REGADDR:
      return state.set('regaddr', action.obj);
    case UPDATE_REGCFG:
      return state.set('regcfg', action.obj);
    case UPDATE_RSD_FORMAT:
      return state.set('rsdRawFormat', action.obj);
    default:
      return state;
  }
}

export default reducer;

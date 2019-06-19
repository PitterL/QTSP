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

import { CLICK_ICON } from './constants';

// The initial state of the App
export const initialState = fromJS({
  item: {
    name: "",
    class: undefined,
  },
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case CLICK_ICON:
        return state.set('item', action.item);
    default:
      return state;
  }
}

export default reducer;

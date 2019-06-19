/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  PLACEHOLDER_COMPORT_NAME,
  PLACEHOLDER_BAURATE_NAME,
  PLACEHOLDER_DEVICE_NAME,
  SET_COMPORT,
  SET_BAUDRATE,
  SELECT_DEVICE,
  OPEN_PORT,
  CLOSE_PORT,
} from './constants';

export function selectParam(name, value) {
  switch (name) {
    case PLACEHOLDER_COMPORT_NAME:
      return { type: SET_COMPORT, value };
    case PLACEHOLDER_BAURATE_NAME:
      return { type: SET_BAUDRATE, value };
    case PLACEHOLDER_DEVICE_NAME:
      return { type: SELECT_DEVICE, value };
    default:
      return { type: none };
  }
}

/**
 * Changes the input field of the form
 *
 * @param  {name} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */
export function openPort() {
  console.log('openPort');
  return {
    type: OPEN_PORT,
  };
}

export function closePort() {
  console.log('closePort');
  return {
    type: CLOSE_PORT,
  };
}

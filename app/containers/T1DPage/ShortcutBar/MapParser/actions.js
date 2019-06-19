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
  OPEN_FILE, 
  UPDATE_REGADDR, 
  UPDATE_REGCFG,
  UPDATE_RSD_FORMAT
} from './constants';

/**
 * Open the file
 *
 * @param  {path} file target type
 *
 * @return {object}    An action object with a type of OPEN_FILE
 */
export function openFile(path) {
  return {
    type: OPEN_FILE,
    path,
  };
}

/**
 * Get the file content
 *
 * @param  {data} file content string
 *         {filename} name of the file type
 *
 * @return {object}    An action object with a type of RECV_FILE
 */
/*
export function recvFile(data, filename) {
  return {
    type: RECV_FILE,
    data,
    filename
  };
}
*/

/**
 * Get the reg address content
 *
 * @param  {obj} file content string
 *
 * @return {object}    An action object with a type of Reg addr
 */
export function updateRegAddr(obj) {
  return {
    type: UPDATE_REGADDR,
    obj,
  };
}

/**
 * Get the reg address content
 *
 * @param  {obj} file content string
 *
 * @return {object}    An action object with a type of REG cfg
 */
export function updateRegCfg(obj) {
  return {
    type: UPDATE_REGCFG,
    obj,
  };
}

/**
 * Get the rsd format content
 *
 * @param  {obj} file content string
 *
 * @return {object}    An action object with a type of RSD Format
 */
export function updateRsdFormat(obj) {
  return {
    type: UPDATE_RSD_FORMAT,
    obj,
  };
}
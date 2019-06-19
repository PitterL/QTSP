/**
 * Gets the repositories of the user from Github
 */

import { select, call, takeLatest, put } from 'redux-saga/effects';
import { ipcRenderer } from 'electron';

import { actionError } from 'containers/App/actions'
import { OPEN_FILE } from './constants';
import { makeSelectFilePath } from './selectors';

/**
 * Github repos request/response handler
 */
export function* openFile(action) {
  // Select username from store
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* sagaRoot() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  //yield takeLatest(OPEN_FILE, openFile);
}

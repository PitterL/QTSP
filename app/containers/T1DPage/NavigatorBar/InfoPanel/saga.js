/**
 * Gets the repositories of the user from Github
 */

import { select, takeLatest } from 'redux-saga/effects';
import { ipcRenderer } from 'electron';

import { OPEN_PORT, CLOSE_PORT } from './constants';

import {
  makeSelectComport,
  makeSelectBaudrate,
  makeSelectDevice,
} from './selectors';

/**
 * Github repos request/response handler
 */
export function* openPort() {
  // Select username from store

  const port = yield select(makeSelectComport());
  const baudrate = yield select(makeSelectBaudrate());
  const device = yield select(makeSelectDevice());

  try {
    console.log(`<ContentZone> openPort ${port} ${baudrate} ${device}`);

    ipcRenderer.send('updi::open', { port, baudrate, device });
    ipcRenderer.once('updi::open-return', (event, arg) => {
      console.log('<ContentZone> openPort result:', arg);
    });

    // yield put(reposLoaded("11", device));
  } catch (err) {
    // yield put(repoLoadingError(err));
  }
}

/**
 * Github repos request/response handler
 */
export function* closePort() {
  try {
    console.log('<ContentZone> closePort');

    ipcRenderer.send('updi::close');
    ipcRenderer.once('updi::close-return', (event, arg) => {
      console.log('<ContentZone> closePort result:', arg);
    });

    // yield put(reposLoaded("22", device));
  } catch (err) {
    // yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* openUpdi() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(OPEN_PORT, openPort);
  yield takeLatest(CLOSE_PORT, closePort);
}

/**
 * Gets the repositories of the user from Github
 */

import { select, put, takeLatest } from 'redux-saga/effects';
import { ipcRenderer } from 'electron';

import { 
  SELECT_CATEGORY, 
  SELECT_ACTION
} from './constants';

import {
  UPDATE_RSD_FORMAT,
} from '../../ShortcutBar/MapParser/constants';

import {
  updateRsdData
} from './actions';

import {
  makeSelectCategory,
  makeSelectAction,
} from './selectors';

/**
 * Github repos request/response handler
 */
export function* selectCategory(cate) {
  // Select button action from store

  const act = yield select(makeSelectAction());

  try {
    console.log(`<ContentZone> selectCategory ${cate} ${act}`);

    //ipcRenderer.send('updi-cmd', { op:'read mem', addr:, size: });
    ipcRenderer.once('updi-cmd-return', (event, arg) => {
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
export function* asyncUpdateRsdFormat(rsdFormats) {
  yield put(updateRsdData(rsdFormats));
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
  yield takeLatest(SELECT_CATEGORY, selectCategory);
  //yield takeLatest(UPDATE_RSD_FORMAT, asyncUpdateRsdFormat);
}

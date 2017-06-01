import { call, fork, put, take } from 'redux-saga/effects';

import { IMPORTS_FILE_LOADED } from '../../../../api/constants';
import { FILE_LOADER_LOAD } from '../constants';

import fileLoaderApi from '../.';

function* loadFile(file) {
  const { content, error } = yield call(fileLoaderApi.loadFile, file);
  if (error) {
    console.error(error);
    return;
  }

  yield put({ type: IMPORTS_FILE_LOADED, content });
}

// eslint-disable-next-line import/prefer-default-export
export function* watchLoadFileSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { file } = yield take(FILE_LOADER_LOAD);
    yield fork(loadFile, file);
  }
}

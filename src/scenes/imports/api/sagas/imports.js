import { call, fork, put, take } from 'redux-saga/effects';

import importApi from '../.';
import { IMPORTS_FILE_LOADED, IMPORTS_PAPERS_RECEIVED } from '../constants';

const sourceImportFunc = {
  'chrome-bookmarks': importApi.importChromeBookmarks,
};

function* importPapers(content, source) {
  const importFunc = sourceImportFunc[source];
  if (!importFunc) return;

  const { papers, error } = yield call(importFunc, content);
  if (error) {
    console.error(error);
    return;
  }

  yield put({ type: IMPORTS_PAPERS_RECEIVED, papers });
}

// eslint-disable-next-line import/prefer-default-export
export default function* watchImportBookmarksSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { content } = yield take(IMPORTS_FILE_LOADED);
    const source = 'chrome-bookmarks';
    yield fork(importPapers, content, source);
  }
}

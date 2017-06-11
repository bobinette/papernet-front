import { call, fork, put, take } from 'redux-saga/effects';

import searchApi from '../.';
import { SEARCH_GO } from '../constants';

function* search(q, limit, offset, sources) {
  const { response, error } = yield call(searchApi.search, q, limit, offset, sources);
  if (error) {
    console.error(error);
    return;
  }

  console.log(response);
  // yield put({ type: IMPORTS_PAPERS_RECEIVED, papers });
}

// eslint-disable-next-line import/prefer-default-export
export default function* watchImportBookmarksSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { q, limit, offset, sources } = yield take(SEARCH_GO);
    yield fork(search, q, limit, offset, sources);
  }
}

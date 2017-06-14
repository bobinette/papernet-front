import { call, fork, put, select, take } from 'redux-saga/effects';

import searchApi from '../.';
import { SEARCH_GO, SEARCH_RECEIVE, SEARCH_UPDATE_OFFSET } from '../constants';

function* search(q, limit, offset, sources) {
  const { response, error } = yield call(searchApi.search, q, limit, offset, sources);
  if (error) {
    console.error(error);
    return;
  }

  yield put({ type: SEARCH_RECEIVE, results: response, sources });
}

export function* watchSearchSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { q, limit, offset, sources } = yield take(SEARCH_GO);
    yield fork(search, q, limit, offset, sources);
  }
}

export function* watchUpdateOffsetSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { offset, source } = yield take(SEARCH_UPDATE_OFFSET);
    const q = yield select(state => state.search.get('q'));
    yield fork(search, q, 0, offset, [source]);
  }
}

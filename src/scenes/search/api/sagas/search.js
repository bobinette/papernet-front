import { call, fork, put, select, take } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import searchApi from '../.';
import {
  SEARCH_GO,
  SEARCH_LOADING_START,
  SEARCH_LOADING_STOP,
  SEARCH_RECEIVE,
  SEARCH_UPDATE_OFFSET,
} from '../constants';

function* search(token, q, limit, offset, sources) {
  yield put({ type: SEARCH_LOADING_START });
  const { response, error } = yield call(searchApi.search, token, q, limit, offset, sources);
  yield put({ type: SEARCH_LOADING_STOP });

  if (error) {
    toastr.error('Error getting search results', `Error: ${error}`);
    return;
  }

  yield put({ type: SEARCH_RECEIVE, results: response, sources });
}

export function* watchSearchSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { q, limit, offset, sources } = yield take(SEARCH_GO);
    const token = yield select(state => (state.auth.getIn(['token', 'token'])));
    yield fork(search, token, q, limit, offset, sources);
  }
}

export function* watchUpdateOffsetSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { offset, source } = yield take(SEARCH_UPDATE_OFFSET);
    const token = yield select(state => (state.auth.getIn(['token', 'token'])));
    const q = yield select(state => state.search.get('q'));
    yield fork(search, token, q, 0, offset, [source]);
  }
}

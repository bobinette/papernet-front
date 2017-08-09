import { call, fork, put, select, take } from 'redux-saga/effects';

import { TOKEN_RECEIVE, USER_SIGN_OUT } from 'services/auth/constants';

import fetchApi from '../.';
import {
  PAPER_LIST_FETCH,
  PAPER_LIST_LOADING_START,
  PAPER_LIST_LOADING_STOP,
  PAPER_LIST_RECEIVED,

  PAPER_LIST_UPDATE_FILTERS,
  PAPER_LIST_UPDATE_PAGINATION,
} from '../constants';

function* fetchList(token, filters, pagination) {
  yield put({ type: PAPER_LIST_LOADING_START });
  const { response, error } = yield call(fetchApi.fetchList, token, filters, pagination);
  yield put({ type: PAPER_LIST_LOADING_STOP });

  if (error) {
    console.error(error);
    return;
  }

  yield put({ type: PAPER_LIST_RECEIVED, results: response });
}

export function* watchFetchSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    yield take(PAPER_LIST_FETCH);

    // Wait for the token to be loaded if needed
    let token = yield select(s => (s.auth.getIn(['token', 'token'])));
    if (!token) {
      yield take(TOKEN_RECEIVE);
      token = yield select(s => (s.auth.getIn(['token', 'token'])));
    }

    const filters = yield select(s => s.home.get('filters'));
    const pagination = yield select(s => s.home.get('pagination'));

    yield fork(fetchList, token, filters, pagination);
  }
}

export function* watchClearListSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    yield take(USER_SIGN_OUT);
    yield put({ type: PAPER_LIST_RECEIVED, results: { data: [], total: 0 } });
  }
}

export function* watchUpdateFiltersSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { key, value } = yield take(PAPER_LIST_UPDATE_FILTERS);
    let filters = yield select(s => s.home.get('filters'));
    filters = filters.set(key, value);

    const pagination = yield select(s => s.home.get('pagination'));

    const token = yield select(s => (s.auth.getIn(['token', 'token'])));
    yield fork(fetchList, token, filters.toJS(), pagination.toJS());
  }
}

export function* wathUpdatePaginationSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { key, value } = yield take(PAPER_LIST_UPDATE_PAGINATION);
    let pagination = yield select(s => s.home.get('pagination'));
    pagination = pagination.set(key, value);

    const filters = yield select(s => s.home.get('filters'));

    const token = yield select(s => s.auth.getIn(['token', 'token']));
    yield fork(fetchList, token, filters.toJS(), pagination.toJS());
  }
}

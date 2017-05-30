import { call, fork, put, take } from 'redux-saga/effects';

import authApi from 'api/auth';

import { RECEIVE_USER } from 'auth/constants';

import { TOKEN_RECEIVE, USER_RECEIVE } from '../constants';

function* fetchUser(token) {
  if (!token) return;

  const { user, error } = yield call(authApi.fetchUser, token);

  if (error) {
    console.error(error);
    return;
  }

  yield put({ type: USER_RECEIVE, user });

  // Tmp: still use the old auth reducer
  yield put({ type: RECEIVE_USER, user });
}

// eslint-disable-next-line import/prefer-default-export
export function* watchFetchUserSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { token } = yield take(TOKEN_RECEIVE);
    yield fork(fetchUser, token);
  }
}

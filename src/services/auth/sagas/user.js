import { call, fork, put, take } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

import authApi from 'api/auth';

import { TOKEN_RECEIVE, USER_RECEIVE, USER_SIGN_OUT } from '../constants';

function* fetchUser(token) {
  if (!token) return;

  const { user, error } = yield call(authApi.fetchUser, token);

  if (error) {
    console.error(error);
    return;
  }

  yield put({ type: USER_RECEIVE, user });
}

function signOut() {
  browserHistory.push('/');
  // TODO: move to cookie.js
  cookie.remove('access_token', { path: '/' });
}

export function* watchFetchUserSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { token } = yield take(TOKEN_RECEIVE);
    yield fork(fetchUser, token);
  }
}

export function* watchSignOutSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    yield take(USER_SIGN_OUT);
    yield fork(signOut);
  }
}

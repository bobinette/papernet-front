import { fork, put, take } from 'redux-saga/effects';
import cookie from 'react-cookie';

import { TOKEN_COOKIE_LOAD, TOKEN_RECEIVE } from '../constants';

function* loadCookie() {
  const token = cookie.load('access_token', true);
  yield put({ type: TOKEN_RECEIVE, token: token || '' });
}

function saveCookie(token) {
  cookie.save('access_token', token, { path: '/' });
}

export function* watchLoadCookieSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    yield take(TOKEN_COOKIE_LOAD);
    yield fork(loadCookie);
  }
}

export function* watchSaveCookieSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { token } = yield take(TOKEN_RECEIVE);
    yield fork(saveCookie, token);
  }
}

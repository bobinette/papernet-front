import { fork, take } from 'redux-saga/effects';
import cookie from 'react-cookie';

import { TOKEN_COOKIE_LOAD, TOKEN_RECEIVE } from '../constants';

function loadCookie() {
  console.log('loadCookie');
}

function saveCookie(token) {
  cookie.save('token', token, { path: '/' });
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

import { call, put } from 'redux-saga/effects';
import cookie from 'react-cookie';

import { TOKEN_COOKIE_LOADED, TOKEN_RECEIVE } from '../constants';

export function* loadCookie() {
  const token = cookie.load('access_token', true);
  if (token) {
    yield put({ type: TOKEN_RECEIVE, token });
  } else {
    yield put({ type: TOKEN_COOKIE_LOADED });
  }
}

export function* saveCookie(token) {
  yield call(cookie.save, 'access_token', token.token, { path: '/' });
}

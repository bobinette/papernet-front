import { call, fork, put, take } from 'redux-saga/effects';
import { browserHistory } from 'react-router';

import { TOKEN_RECEIVE } from 'services/auth/constants';

import emailApi from '../.';
import { EMAIL_LOGIN_SIGN_IN, EMAIL_LOGIN_SIGN_UP } from '../constants';

function* signIn(email, password) {
  const { token, error } = yield call(emailApi.signIn, email, password);
  if (error) {
    console.error(error);
    return;
  }

  yield put({ type: TOKEN_RECEIVE, token });
  browserHistory.push('/');
}

function* signUp(email, password) {
  const { token, error } = yield call(emailApi.signUp, email, password);
  if (error) {
    console.error(error);
    return;
  }

  yield put({ type: TOKEN_RECEIVE, token });
  browserHistory.push('/');
}

export function* watchEmailSignInSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { email, password } = yield take(EMAIL_LOGIN_SIGN_IN);
    yield fork(signIn, email, password);
  }
}

export function* watchEmailSignUpSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { email, password } = yield take(EMAIL_LOGIN_SIGN_UP);
    yield fork(signUp, email, password);
  }
}

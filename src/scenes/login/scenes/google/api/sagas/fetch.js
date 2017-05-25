import { call, fork, put, take } from 'redux-saga/effects';

import { TOKEN_RECEIVE } from 'services/auth/constants';

import googleApi from '../.';
import { TOKEN_FETCH_GOOGLE } from '../constants';

function* fetchToken(code, state) {
  const { token, error } = yield call(googleApi.fetchToken, code, state);
  if (error) {
    console.error(error);
    return;
  }

  yield put({ type: TOKEN_RECEIVE, token });
}

export default function* watchGoogleFetchTokenSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { code, state } = yield take(TOKEN_FETCH_GOOGLE);
    yield fork(fetchToken, code, state);
  }
}

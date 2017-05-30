import { call, fork, take } from 'redux-saga/effects';

import googleApi from 'scenes/login/components/google/api';
import { GOOGLE_LOGIN_URL_FETCH } from 'scenes/login/components/google/api/constants';

function* gotoLoginURL() {
  const { url, error } = yield call(googleApi.fetchLoginUrl);
  if (error) {
    console.error(error);
    return;
  }

  window.location.href = url;
}

export default function* watchGoogleLoginUrlSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    yield take(GOOGLE_LOGIN_URL_FETCH); // wait for PROVIDERS_FETCH event
    yield fork(gotoLoginURL);
  }
}

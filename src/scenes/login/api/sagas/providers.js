import { call, fork, put, take } from 'redux-saga/effects';

import loginApi from 'scenes/login/api';

import { PROVIDERS_FETCH, PROVIDERS_RECEIVE } from 'scenes/login/api/constants';

function* fetchProviders() {
  const { providers, error } = yield call(loginApi.fetchProviders);
  if (error) {
    console.error(error);
    return;
  }
  yield put({ type: PROVIDERS_RECEIVE, providers });
}

export default function* watchProvidersSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    yield take(PROVIDERS_FETCH); // wait for PROVIDERS_FETCH event
    yield fork(fetchProviders);
  }
}

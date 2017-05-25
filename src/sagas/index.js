import { fork } from 'redux-saga/effects';

import authSagas from 'services/auth/sagas';

import loginSagas from 'scenes/login/api/sagas';
import profileSagas from 'profile/teams/sagas';

export default function* rootSaga() {
  yield [
    fork(authSagas),
    fork(loginSagas),
    fork(profileSagas),
  ];
}

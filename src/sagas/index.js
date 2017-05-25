import { fork } from 'redux-saga/effects';

import loginSagas from 'scenes/login/api/sagas';
import profileSagas from 'profile/teams/sagas';

export default function* rootSaga() {
  yield [
    fork(loginSagas),
    fork(profileSagas),
  ];
}

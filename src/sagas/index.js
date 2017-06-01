import { fork } from 'redux-saga/effects';

// Services
import authSagas from 'services/auth/sagas';

// Scenes
import loginSagas from 'scenes/login/api/sagas';
import importsSagas from 'scenes/imports/api/sagas';

// Old school
import profileSagas from 'profile/teams/sagas';

export default function* rootSaga() {
  yield [
    // Services
    fork(authSagas),

    // Scenes
    fork(loginSagas),
    fork(importsSagas),

    // Old school
    fork(profileSagas),
  ];
}

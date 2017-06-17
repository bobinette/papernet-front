import { fork } from 'redux-saga/effects';

// Services
import authSagas from 'services/auth/sagas';

// Scenes
import importsSagas from 'scenes/imports/api/sagas';
import loginSagas from 'scenes/login/api/sagas';
import searchSagas from 'scenes/search/api/sagas';

// Old school
import profileSagas from 'profile/teams/sagas';

export default function* rootSaga() {
  yield [
    // Services
    fork(authSagas),

    // Scenes
    fork(importsSagas),
    fork(loginSagas),
    fork(searchSagas),

    // Old school
    fork(profileSagas),
  ];
}

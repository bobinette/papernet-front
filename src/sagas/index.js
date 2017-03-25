import { fork } from 'redux-saga/effects';

import profileSagas from 'profile/teams/sagas';

export default function* rootSaga() {
  yield [
    fork(profileSagas),
  ];
}

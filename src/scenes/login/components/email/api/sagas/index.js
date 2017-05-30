import { fork } from 'redux-saga/effects';

import { watchEmailSignInSaga, watchEmailSignUpSaga } from './signin';

export default function* sagas() {
  yield [
    fork(watchEmailSignInSaga),
    fork(watchEmailSignUpSaga),
  ];
}

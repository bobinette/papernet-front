import { fork } from 'redux-saga/effects';

import watchLoginUrlSaga from './login';

export default function* sagas() {
  yield [
    fork(watchLoginUrlSaga),
  ];
}

import { fork } from 'redux-saga/effects';

import { watchLoadFileSaga } from './file';

export default function* sagas() {
  yield [
    fork(watchLoadFileSaga),
  ];
}

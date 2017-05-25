import { fork } from 'redux-saga/effects';

import watchProvidersSaga from './providers';

export default function* sagas() {
  yield [
    fork(watchProvidersSaga),
  ];
}

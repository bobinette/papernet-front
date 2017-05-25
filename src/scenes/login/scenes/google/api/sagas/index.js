import { fork } from 'redux-saga/effects';

// Gather the scene sagas
import watchGoogleFetchTokenSaga from './fetch';

export default function* sagas() {
  yield [
    fork(watchGoogleFetchTokenSaga),
  ];
}

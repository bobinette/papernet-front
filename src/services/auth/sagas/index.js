import { fork } from 'redux-saga/effects';

import { watchLoadCookieSaga, watchSaveCookieSaga } from './cookie';

export default function* sagas() {
  yield [
    fork(watchLoadCookieSaga),
    fork(watchSaveCookieSaga),
  ];
}

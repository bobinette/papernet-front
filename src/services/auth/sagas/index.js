import { fork } from 'redux-saga/effects';

import { watchLoadCookieSaga, watchSaveCookieSaga } from './cookie';
import { watchFetchUserSaga } from './user';

export default function* sagas() {
  yield [
    // Cookie
    fork(watchLoadCookieSaga),
    fork(watchSaveCookieSaga),

    // User
    fork(watchFetchUserSaga),
  ];
}

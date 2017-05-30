import { fork } from 'redux-saga/effects';

import { watchLoadCookieSaga, watchSaveCookieSaga } from './cookie';
import { watchFetchUserSaga, watchSignOutSaga } from './user';

export default function* sagas() {
  yield [
    // Cookie
    fork(watchLoadCookieSaga),
    fork(watchSaveCookieSaga),

    // User
    fork(watchFetchUserSaga),
    fork(watchSignOutSaga),
  ];
}

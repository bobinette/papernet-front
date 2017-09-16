import { fork, takeEvery } from 'redux-saga/effects';

import { TOKEN_COOKIE_LOAD, TOKEN_RECEIVE } from '../constants';

import { loadCookie, saveCookie } from './cookie';
import { watchFetchUserSaga, watchSignOutSaga } from './user';
import { watchBookmarkSaga } from './bookmark';

export default function* sagas() {
    yield [
        // Cookie
        takeEvery(TOKEN_COOKIE_LOAD, loadCookie),
        takeEvery(TOKEN_RECEIVE, saveCookie),

        // User
        fork(watchFetchUserSaga),
        fork(watchSignOutSaga),

        // Bookmark
        fork(watchBookmarkSaga),
    ];
}

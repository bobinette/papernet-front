import { call, put, select, take } from 'redux-saga/effects';

import authApi from 'api/auth';

import { USER_BOOKMARK, USER_RECEIVE } from 'services/auth/constants';

// eslint-disable-next-line import/prefer-default-export
export function* watchBookmarkSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { paperId, bookmark } = yield take(USER_BOOKMARK);
    const token = yield select(s => s.auth.getIn(['token', 'token']));
    const { user, error } = yield call(authApi.bookmark, token, paperId, bookmark);

    if (error) {
      console.log(error);
      return;
    }

    yield put({ type: USER_RECEIVE, user });
  }
}

import { fork, takeLatest } from 'redux-saga/effects';

import { TEAMS_FETCH } from '../constants';

import fetchTeamsSaga from './fetch';
import watchCreateSaga from './create';
import watchDeleteSaga from './delete';
import watchInviteSaga from './invite';
import watchKickSaga from './kick';
import watchShareSaga from './share';

export default function* sagas() {
  yield [
    fork(takeLatest, TEAMS_FETCH, fetchTeamsSaga),
    fork(watchCreateSaga),
    fork(watchDeleteSaga),
    fork(watchInviteSaga),
    fork(watchKickSaga),
    fork(watchShareSaga),
  ];
}

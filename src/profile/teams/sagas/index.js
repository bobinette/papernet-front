import { fork, takeLatest } from 'redux-saga/effects';

import { TEAMS_FETCH } from '../constants';

import fetchTeamsSaga from './fetch';
import watchInviteSaga from './invite';
import watchKickSaga from './kick';

export default function* sagas() {
  yield [
    fork(takeLatest, TEAMS_FETCH, fetchTeamsSaga),
    fork(watchInviteSaga),
    fork(watchKickSaga),
  ];
}

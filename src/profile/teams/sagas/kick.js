import { put, fork, select, take } from 'redux-saga/effects';

import fetch from 'utils/fetch';
import { papernetURL } from 'utils/constants';

import { TEAMS_KICK, TEAMS_FETCH } from '../constants';

function* kick(token, teamID, userID) {
  try {
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    yield fetch(
      `${papernetURL}/auth/v2/teams/${teamID}/kick`,
      { method: 'POST', headers, body: JSON.stringify({ userID }) },
    );
    yield put({ type: TEAMS_FETCH });
  } catch (error) {
    console.log(error);
  }
}

export default function* watchKickSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { teamID, userID } = yield take(TEAMS_KICK);
    const token = yield select(state => (state.auth.getIn(['token', 'token'])));
    yield fork(kick, token, teamID, userID);
  }
}

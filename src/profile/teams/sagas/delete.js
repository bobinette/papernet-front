import { put, fork, select, take } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import fetch from 'utils/fetch';
import { papernetURL } from 'utils/constants';

import { TEAMS_DELETE, TEAMS_FETCH } from '../constants';

function* deleteGen(token, teamID) {
  try {
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    yield fetch(
      `${papernetURL}/auth/v2/teams/${teamID}`,
      { method: 'DELETE', headers },
    );
    yield put({ type: TEAMS_FETCH });
  } catch (error) {
    toastr.error('', `Error deleting team: ${error.json && error.json.message ? error.json.message : null}`);
  }
}

export default function* watchDeleteSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { teamID } = yield take(TEAMS_DELETE);
    const token = yield select(state => (state.auth.getIn(['token', 'token'])));
    yield fork(deleteGen, token, teamID);
  }
}

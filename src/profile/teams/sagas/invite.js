import { put, fork, select, take } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import fetch from 'utils/fetch';
import { papernetURL } from 'utils/constants';

import { TEAMS_INVITE, TEAMS_FETCH } from '../constants';

function* invite(token, teamID, email) {
  try {
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    yield fetch(
      `${papernetURL}/auth/v2/teams/${teamID}/invite`,
      { method: 'POST', headers, body: JSON.stringify({ email }) },
    );
    yield put({ type: TEAMS_FETCH });
  } catch (error) {
    toastr.error('', `Error inviting: ${error.json && error.json.message ? error.json.message : null}`);
  }
}

export default function* watchInviteSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { teamID, email } = yield take(TEAMS_INVITE);
    const token = yield select(state => (state.auth.getIn(['token', 'token'])));
    yield fork(invite, token, teamID, email);
  }
}

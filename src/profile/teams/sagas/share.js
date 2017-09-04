import { put, fork, select, take } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import fetch from 'utils/fetch';
import { papernetURL } from 'utils/constants';

import { TEAMS_SHARE, TEAMS_FETCH } from '../constants';

function* share(token, teamId, paperId, canEdit) {
  try {
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    yield fetch(
      `${papernetURL}/auth/v2/teams/${teamId}/share`,
      { method: 'POST', headers, body: JSON.stringify({ paperId, canEdit }) },
    );
    yield put({ type: TEAMS_FETCH });
  } catch (error) {
    toastr.error('', `Error inviting: ${error.json && error.json.error ? error.json.error : null}`);
  }
}

export default function* watchShareSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { teamId, paperId, canEdit } = yield take(TEAMS_SHARE);
    const token = yield select(state => (state.auth.getIn(['token', 'token'])));
    yield fork(share, token, teamId, paperId, canEdit);
  }
}

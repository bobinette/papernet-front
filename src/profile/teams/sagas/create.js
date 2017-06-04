import { put, fork, select, take } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import fetch from 'utils/fetch';
import { papernetURL } from 'utils/constants';

import { TEAMS_CREATE, TEAMS_FETCH } from '../constants';

function* create(token, name) {
  try {
    const headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

    yield fetch(
      `${papernetURL}/auth/v2/teams`,
      { method: 'POST', headers, body: JSON.stringify({ name }) },
    );
    yield put({ type: TEAMS_FETCH });
  } catch (error) {
    toastr.error('', `Error creating team: ${error.json && error.json.message ? error.json.message : null}`);
  }
}

export default function* watchCreateSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { name } = yield take(TEAMS_CREATE);
    const token = yield select(state => (state.auth.getIn(['token', 'token'])));
    yield fork(create, token, name);
  }
}

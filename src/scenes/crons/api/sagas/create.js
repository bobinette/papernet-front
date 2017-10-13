import { call, put, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import cronAPI from '../.';
import { CRONS_FETCH } from '../constants';

export function* createCron({ q, sources }) {
  const token = yield select(state => state.auth.getIn(['token', 'token']));
  const { error } = yield call(cronAPI.createCron, token, q, sources);

  if (error) {
    toastr.error('Error loading crons', `Errors: ${error.json.error}`);
    return;
  }

  yield put({ type: CRONS_FETCH });
}

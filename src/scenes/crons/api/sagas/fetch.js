import { call, put, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import cronAPI from '../.';
import { CRONS_RECEIVE } from '../constants';

export function* fetchCrons() {
  const token = yield select(state => state.auth.getIn(['token', 'token']));
  const { response, error } = yield call(cronAPI.fetchCrons, token);

  if (error) {
    toastr.error('Error loading crons', `Errors: ${error.json.error}`);
    return;
  }

  yield put({ type: CRONS_RECEIVE, crons: response.data });
}

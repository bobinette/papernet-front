import { call, put, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import editPaperAPI from '../.';
import { EDIT_PAPER_RECEIVE } from '../constants';

export function* fetchPaper({ id }) {
  const token = yield select(state => (state.auth.getIn(['token', 'token'])));
  const { response, error } = yield call(editPaperAPI.fetchPaper, token, id);

  if (error) {
    toastr.error('Error loading papers', `Errors: ${error.json.error}`);
    return;
  }

  yield put({ type: EDIT_PAPER_RECEIVE, paper: response.data });
}

import { call, put, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { browserHistory } from 'react-router';

import editPaperAPI from '../.';
import { EDIT_PAPER_RECEIVE } from '../constants';

export function* save({ stay }) {
  const token = yield select(state => state.auth.getIn(['token', 'token']));
  const paper = yield select(state => state.editPaper.get('paper'));
  const { response, error } = yield call(editPaperAPI.save, token, paper);

  if (error) {
    toastr.error('Error loading papers', `Errors: ${error.json.error}`);
    return;
  }

  toastr.success('Saved!', 'Paper successfully saved');
  yield put({ type: EDIT_PAPER_RECEIVE, paper: response.data });
  if (!stay) {
    browserHistory.push(`/papers/${response.data.id}`);
  }
}

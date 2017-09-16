import { call, put, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import editPaperAPI from '../.';
import { EDIT_PAPER_GOOGLE_DRIVE_HAS_ACCESS } from '../constants';

export function* checkDriveAccess() {
  const token = yield select(state => state.auth.getIn(['token', 'token']));
  const { response, error } = yield call(editPaperAPI.checkDriveAccess, token);

  if (error) {
    toastr.error('Error checking if Papernet has permission for your Google Drive', `Errors: ${error.json.error}`);
    return;
  }

  const { hasAccess } = response;
  yield put({ type: EDIT_PAPER_GOOGLE_DRIVE_HAS_ACCESS, hasAccess });
}

export function* requireDrive({ currentURL }) {
  const token = yield select(state => state.auth.getIn(['token', 'token']));
  const { response, error } = yield call(editPaperAPI.requireDrive, token, currentURL);

  if (error) {
    toastr.error('Error requiring the permission for Google Drive', `Errors: ${error.json.error}`);
    return;
  }

  const { url } = response;
  window.open(url, '_self');
}

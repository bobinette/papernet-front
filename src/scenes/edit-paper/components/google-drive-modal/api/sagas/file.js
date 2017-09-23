import { call, put, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import googleDriveApi from '../.';
import { GOOGLE_DRIVE_LIST_FILES, GOOGLE_DRIVE_UPLOAD_FILE_LOADING } from '../constants';

export function* uploadFile({ filename, filetype, data }) {
  yield put({ type: GOOGLE_DRIVE_UPLOAD_FILE_LOADING, uploading: true });
  const token = yield select(state => state.auth.getIn(['token', 'token']));
  const { error } = yield call(googleDriveApi.uploadFile, token, filename, filetype, data);

  yield put({ type: GOOGLE_DRIVE_UPLOAD_FILE_LOADING, uploading: false });
  if (error) {
    toastr.error('Error uploading the file in your Google Drive', `Errors: ${error.json.error}`);
    return;
  }

  yield put({ type: GOOGLE_DRIVE_LIST_FILES });
}

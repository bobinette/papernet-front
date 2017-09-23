import { call, put, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import googleDriveApi from '../.';
import {
  GOOGLE_DRIVE_FILES_RECEIVED,
  GOOGLE_DRIVE_LIST_FILES_LOADING,
  GOOGLE_DRIVE_LIST_FILES_NAME,
} from '../constants';

export function* listFiles({ name }) {
  yield put({ type: GOOGLE_DRIVE_LIST_FILES_NAME, name });
  yield put({ type: GOOGLE_DRIVE_LIST_FILES_LOADING, loading: true });
  const token = yield select(state => state.auth.getIn(['token', 'token']));
  const { response, error } = yield call(googleDriveApi.listFiles, token, name);
  yield put({ type: GOOGLE_DRIVE_LIST_FILES_LOADING, loading: false });
  if (error) {
    toastr.error('Error listing files from your drive', `Error: ${error.json.error}`);
    return;
  }

  yield put({ type: GOOGLE_DRIVE_FILES_RECEIVED, files: response.data, nextPageToken: response.nextPageToken });
}

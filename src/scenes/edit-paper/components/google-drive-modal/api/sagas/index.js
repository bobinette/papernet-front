import { takeEvery } from 'redux-saga/effects';

import { GOOGLE_DRIVE_UPLOAD_FILE, GOOGLE_DRIVE_LIST_FILES } from '../constants';

import { uploadFile } from './file';
import { listFiles } from './list';

export default function* sagas() {
  yield [takeEvery(GOOGLE_DRIVE_UPLOAD_FILE, uploadFile)];
  yield [takeEvery(GOOGLE_DRIVE_LIST_FILES, listFiles)];
}

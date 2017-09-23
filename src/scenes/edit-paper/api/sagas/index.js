import { fork, takeEvery } from 'redux-saga/effects';

import { USER_RECEIVE } from 'services/auth/constants';

// Sub-sagas
import googleDriveSagas from 'scenes/edit-paper/components/google-drive-modal/api/sagas';

import { EDIT_PAPER_FETCH, EDIT_PAPER_REQUIRE_DRIVE, EDIT_PAPER_SAVE } from '../constants';

import { fetchPaper } from './fetch';
import { save } from './save';
import { requireDrive, checkDriveAccess } from './google';

export default function* sagas() {
  yield [
    takeEvery(EDIT_PAPER_FETCH, fetchPaper),
    takeEvery(EDIT_PAPER_SAVE, save),

    // Google drive
    takeEvery(USER_RECEIVE, checkDriveAccess),
    takeEvery(EDIT_PAPER_REQUIRE_DRIVE, requireDrive),

    // Sub-sagas
    fork(googleDriveSagas),
  ];
}

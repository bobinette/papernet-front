import { fork, takeEvery } from 'redux-saga/effects';

import { USER_RECEIVE } from 'services/auth/constants';

// Sub-sagas
import googleDriveSagas from 'scenes/edit-paper/components/google-drive-modal/api/sagas';

import { EDIT_PAPER_FETCH, EDIT_PAPER_REQUIRE_DRIVE } from '../constants';

import { fetchPaper } from './fetch';
import { requireDrive, checkDriveAccess } from './google';

export default function* sagas() {
  yield [
    takeEvery(EDIT_PAPER_FETCH, fetchPaper),
    takeEvery(EDIT_PAPER_REQUIRE_DRIVE, requireDrive),

    // Check drive on user login
    takeEvery(USER_RECEIVE, checkDriveAccess),

    // Sub-sagas
    fork(googleDriveSagas),
  ];
}

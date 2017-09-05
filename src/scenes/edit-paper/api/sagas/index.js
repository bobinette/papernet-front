import { takeEvery } from 'redux-saga/effects';

import { EDIT_PAPER_FETCH, EDIT_PAPER_REQUIRE_DRIVE, EDIT_PAPER_LOGIN } from '../constants';

import { fetchPaper } from './fetch';
import { requireDrive, login } from './google';

export default function* sagas() {
  yield [
    takeEvery(EDIT_PAPER_FETCH, fetchPaper),
    takeEvery(EDIT_PAPER_REQUIRE_DRIVE, requireDrive),
    takeEvery(EDIT_PAPER_LOGIN, login),
  ];
}

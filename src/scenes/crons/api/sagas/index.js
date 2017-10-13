import { takeEvery } from 'redux-saga/effects';

import { CRONS_CREATE, CRONS_FETCH } from '../constants';

import { fetchCrons } from './fetch';
import { createCron } from './create';

export default function* sagas() {
  yield [takeEvery(CRONS_CREATE, createCron)];
  yield [takeEvery(CRONS_FETCH, fetchCrons)];
}

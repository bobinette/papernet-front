import { call, fork, put, select, take } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import searchApi from '../.';
import { SEARCH_IMPORT, SEARCH_IMPORTED } from '../constants';

function* importPaper(token, paper) {
  const { response, error } = yield call(searchApi.importPaper, token, paper);
  if (error) {
    toastr.error('Error importing paper', `Error: ${error}`);
    return;
  }

  yield put({ type: SEARCH_IMPORTED, paper: response });
}

export default function* watchImportPaperSaga() {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { paper } = yield take(SEARCH_IMPORT);
    const token = yield select(state => (state.auth.getIn(['token', 'token'])));
    yield fork(importPaper, token, paper);
  }
}

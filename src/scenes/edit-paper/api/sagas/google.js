import { call, put, select } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';

import editPaperAPI from '../.';
import { EDIT_PAPER_LOGIN } from '../constants';

export function* requireDrive() {
  const token = yield select(state => (state.auth.getIn(['token', 'token'])));
  const { response, error } = yield call(editPaperAPI.requireDrive, token);

  if (error) {
    toastr.error('Error listing files in your Google Drive', `Errors: ${error.json.error}`);
    return;
  }

  if (!response.hasAccess) {
    yield put({ type: EDIT_PAPER_LOGIN, url: response.url });
  }
}

export function login({ url }) {
  const win = window.open(url, '_blank', 'width=500,height=600');
  if (window.focus) {
    win.focus();
  }

  const pollTimer = window.setInterval(() => {
    try {
      // Will fail until the URL belongs to papernet again (in Chrome at least)
      //
      // DOMException: Blocked a frame with origin "xxx" from accessing a cross-origin frame.
      win.document.URL; // eslint-disable-line no-unused-expressions

      window.clearInterval(pollTimer);
      win.close();
    } catch (e) { // eslint-disable-line no-empty
    }
  }, 1000);
}

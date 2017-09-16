import { fromJS } from 'immutable';

import { USER_SIGN_OUT } from 'services/auth/constants';

import {
  GOOGLE_DRIVE_FILES_RECEIVED,
  GOOGLE_DRIVE_LIST_FILES_LOADING,
  GOOGLE_DRIVE_UPLOAD_FILE_LOADING,
  GOOGLE_DRIVE_LIST_FILES_NAME,
} from './constants';

const initialState = fromJS({
  q: {
    name: '',
  },
  files: [],
  loading: false,
  uploading: false,
});

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case USER_SIGN_OUT:
      newState = newState.set('hasAccess', false);
      break;
    case GOOGLE_DRIVE_LIST_FILES_NAME:
      newState = newState.setIn(['q', 'name'], action.name);
      break;
    case GOOGLE_DRIVE_FILES_RECEIVED:
      newState = newState.set('files', fromJS(action.files));
      break;
    case GOOGLE_DRIVE_LIST_FILES_LOADING:
      newState = newState.set('loading', action.loading);
      break;
    case GOOGLE_DRIVE_UPLOAD_FILE_LOADING:
      newState = newState.set('uploading', action.uploading);
      break;
    default:
  }
  return newState;
};

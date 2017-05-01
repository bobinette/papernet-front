import { fromJS } from 'immutable';

import { LOADED_TOKEN, RECEIVE_TOKEN, RECEIVE_USER } from './constants';

const initialState = fromJS({
  user: {
    id: '',
    name: '',
    email: '',
    bookmarks: [],
    canSee: [],
  },
  token: '',
  loading: false,
  tokenLoaded: false,
});

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case RECEIVE_TOKEN:
      newState = newState.set('token', action.token);
      break;
    case LOADED_TOKEN:
      newState = newState.set('tokenLoaded', true);
      break;
    case RECEIVE_USER:
      newState = newState.set('user', fromJS(action.user));
      break;
    default:
  }
  return newState;
};

import { fromJS } from 'immutable';

import { RECEIVE_TOKEN, RECEIVE_USER } from './constants';

const initialState = fromJS({
  user: {
    id: '',
    name: '',
    bookmarks: [],
  },
  token: '',
});

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case RECEIVE_TOKEN:
      newState = newState.set('token', action.token);
      break;
    case RECEIVE_USER:
      newState = newState.set('user', fromJS(action.user));
      break;
    default:
  }
  return newState;
};

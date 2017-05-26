import { fromJS } from 'immutable';

import { TOKEN_RECEIVE, USER_RECEIVE } from './constants';

const initialState = fromJS({
  user: {
    id: '',
    name: '',
    email: '',
    bookmarks: [],
    canSee: [],
  },
  token: {
    loaded: false,
    token: '',
  },
});

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case TOKEN_RECEIVE:
      newState = newState.set('token', { token: action.token, loaded: true });
      break;
    case USER_RECEIVE:
      newState = newState.set('user', action.user);
      break;
    default:
  }
  return newState;
};

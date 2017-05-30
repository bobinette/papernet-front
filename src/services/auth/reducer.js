import { fromJS } from 'immutable';

import { TOKEN_RECEIVE, USER_RECEIVE, USER_SIGN_OUT } from './constants';

const initialState = fromJS({
  user: {
    id: 0,
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
      newState = newState.set('token', fromJS({ token: action.token, loaded: true }));
      break;
    case USER_RECEIVE:
      newState = newState.set('user', fromJS(action.user));
      break;
    case USER_SIGN_OUT:
      newState = initialState.setIn(['token', 'loaded'], true);
      break;
    default:
  }
  return newState;
};

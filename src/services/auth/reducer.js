import { fromJS } from 'immutable';

import { TOKEN_RECEIVE } from './constants';

const initialState = fromJS({
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
    default:
  }
  return newState;
};

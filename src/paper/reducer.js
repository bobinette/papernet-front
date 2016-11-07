import { fromJS } from 'immutable';

import { RECEIVE_PAPER, UPDATE_PAPER } from './constants';

const initialState = fromJS({});

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case RECEIVE_PAPER:
      newState = fromJS(action.paper);
      break;
    case UPDATE_PAPER:
      newState = state.set(action.key, action.value);
      break;
    default:
  }
  return newState;
};

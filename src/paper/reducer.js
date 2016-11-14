import { fromJS } from 'immutable';

import { RECEIVE_PAPER, UPDATE_PAPER } from './constants';

const initialState = fromJS({
  title: '',
  summary: '',
});

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case RECEIVE_PAPER:
      newState = fromJS(action.paper);
      break;
    case UPDATE_PAPER:
      newState = newState.setIn(action.key, action.value);
      break;
    default:
  }
  return newState;
};

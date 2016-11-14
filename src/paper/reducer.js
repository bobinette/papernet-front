import { fromJS } from 'immutable';

import { FECTH_PAPER, RECEIVE_PAPER, UPDATE_PAPER } from './constants';

const initialState = fromJS({
  paper: {
    title: '',
    summary: '',
  },
  loading: false,
});

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case FECTH_PAPER:
      newState = newState.set('loading', true);
      break;
    case RECEIVE_PAPER:
      newState = newState.set('paper', fromJS(action.paper));
      newState = newState.set('loading', false);
      break;
    case UPDATE_PAPER:
      newState = newState.setIn(['paper'].concat(action.key), action.value);
      break;
    default:
  }
  return newState;
};

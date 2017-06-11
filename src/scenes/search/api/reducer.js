import { fromJS } from 'immutable';

import { SEARCH_UPDATE_Q } from './constants';

const initialState = fromJS({
  q: '',
});

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case SEARCH_UPDATE_Q:
      newState = newState.set('q', action.q);
      break;
    default:
  }
  return newState;
};

import { fromJS } from 'immutable';

import { RECEIVE_IMPORTS, SEARCH_IMPORTS } from './constants';

const initialState = fromJS({
  filters: {
    title: '',
  },
  list: [],
});

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case SEARCH_IMPORTS:
      newState = newState.set('filters', action.value);
      break;
    case RECEIVE_IMPORTS:
      newState = newState.set('list', fromJS(action.list));
      break;
    default:
  }
  return newState;
};

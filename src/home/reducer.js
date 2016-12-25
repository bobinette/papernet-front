import { fromJS } from 'immutable';

import { RECEIVE_PAPER_LIST, SEARCH_PAPER_LIST, UPDATE_FILTERS } from './constants';

const initialState = fromJS({
  filters: {
    bookmarked: false,
    q: '',
  },
  papers: [],
  search: '',
});

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case RECEIVE_PAPER_LIST:
      newState = newState.set('papers', fromJS(action.papers));
      break;
    case SEARCH_PAPER_LIST:
      newState = newState.set('search', action.search);
      break;
    case UPDATE_FILTERS:
      newState = newState.setIn(['filters', action.key], action.value);
      break;
    default:
  }
  return newState;
};

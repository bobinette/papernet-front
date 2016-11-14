import { fromJS } from 'immutable';

import { RECEIVE_PAPER_LIST, SEARCH_PAPER_LIST } from './constants';

const initialState = fromJS({
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
    default:
  }
  return newState;
};

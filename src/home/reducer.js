import { fromJS } from 'immutable';

import { RECEIVE_PAPER_LIST, UPDATE_FILTERS, UPDATE_HOME_OFFSET } from './constants';

const initialState = fromJS({
  facets: {
    tags: [],
  },
  filters: {
    bookmarked: false,
    q: '',
    tags: [],
  },
  papers: [],
  search: '',
  pagination: {
    limit: 20,
    offset: 0,
    total: 0,
  },
});

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case RECEIVE_PAPER_LIST:
      newState = newState.set('papers', fromJS(action.papers));
      newState = newState.set('facets', fromJS(action.facets));
      newState = newState.setIn(['pagination', 'total'], action.total);
      break;
    case UPDATE_FILTERS:
      newState = newState.setIn(['filters', action.key], action.value);
      break;
    case UPDATE_HOME_OFFSET:
      newState = newState.setIn(['pagination', 'offset'], action.offset);
      break;
    default:
  }
  return newState;
};

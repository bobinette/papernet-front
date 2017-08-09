import { fromJS } from 'immutable';

import { PAPER_LIST_RECEIVED, PAPER_LIST_UPDATE_FILTERS } from './constants';

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
  pagination: {
    limit: 20,
    offset: 0,
    total: 0,
  },
});

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case PAPER_LIST_RECEIVED:
      newState = newState.withMutations((s) => {
        s.set('papers', fromJS(action.results.data));
        s.set('facets', fromJS(action.results.facets));
        s.set('pagination', fromJS(action.results.pagination));
      });
      break;
    case PAPER_LIST_UPDATE_FILTERS:
      newState = newState.setIn(['filters', action.key], action.value);
      break;
    default:
  }
  return newState;
};

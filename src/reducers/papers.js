import {fromJS} from 'immutable';

import { FILTER_PAPERS, RECEIVE_PAPERS, SEARCH_PAPERS } from '../constants/events';

const initialState = fromJS({
  list: [],
  filters: {
    ids: [],
    q: ''
  }
});

const receivePapers = (papers, state) => {
  const newState = state.set('list', fromJS(papers));
  return newState;
};

const search = (search, state) => {
  const newState = state.setIn(['filters', 'q'], search);
  return newState;
};

const filterPapers = (ids, state) => {
  const newState = state.setIn(['filters', 'ids'], ids);
  return newState;
};

export default (state=initialState, action) => {
  switch(action.type) {
  case RECEIVE_PAPERS: return receivePapers(action.papers, state);
  case SEARCH_PAPERS: return search(action.search, state);
  case FILTER_PAPERS: return filterPapers(action.ids, state);
  }
  return state;
};

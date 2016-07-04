import {fromJS} from 'immutable';

import { RECEIVE_PAPERS, SEARCH_PAPERS } from '../constants/events';

const initialState = fromJS({
  list: [],
  filters: {
    q: '',
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

export default (state=initialState, action) => {
  switch(action.type) {
  case RECEIVE_PAPERS: return receivePapers(action.papers, state);
  case SEARCH_PAPERS: return search(action.search, state);
  }
  return state;
};

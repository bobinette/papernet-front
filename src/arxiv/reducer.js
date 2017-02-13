import { fromJS } from 'immutable';

import {
  RECEIVE_ARXIV,
  START_LOADING,
  STOP_LOADING,
  SEARCH_ARXIV,
  UPDATE_ARXIV_OFFSET,
 } from './constants';

const initialState = fromJS({
  list: [],
  loading: false,
  filters: {
    q: '',
  },
  pagination: {
    limit: 20,
    offset: 0,
    total: 0,
  },
});

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case SEARCH_ARXIV:
      newState = newState.setIn(['filters', 'q'], action.value);
      break;
    case START_LOADING:
      newState = newState.set('loading', true);
      break;
    case STOP_LOADING:
      newState = newState.set('loading', false);
      break;
    case RECEIVE_ARXIV:
      newState = newState.set('list', fromJS(action.list));
      newState = newState.setIn(['pagination', 'total'], action.total);
      break;
    case UPDATE_ARXIV_OFFSET:
      newState = newState.setIn(['pagination', 'offset'], action.offset);
      break;
    default:
  }
  return newState;
};

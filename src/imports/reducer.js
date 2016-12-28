import { fromJS } from 'immutable';

import {
  RECEIVE_IMPORTS,
  START_LOADING,
  STOP_LOADING,
  SEARCH_IMPORTS,
  UPDATE_OFFSET,
 } from './constants';

const initialState = fromJS({
  list: [],
  loading: false,
  q: '',
  pagination: {
    limit: 10,
    offset: 0,
    total: 0,
  },
});

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case SEARCH_IMPORTS:
      newState = newState.set('q', action.value);
      break;
    case START_LOADING:
      newState = newState.set('loading', true);
      break;
    case STOP_LOADING:
      newState = newState.set('loading', false);
      break;
    case RECEIVE_IMPORTS:
      newState = newState.set('list', fromJS(action.list));
      newState = newState.setIn(['pagination', 'total'], action.total);
      break;
    case UPDATE_OFFSET:
      newState = newState.setIn(['pagination', 'offset'], action.offset);
      break;
    default:
  }
  return newState;
};

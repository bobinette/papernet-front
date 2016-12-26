import { fromJS } from 'immutable';

import { RECEIVE_IMPORTS, START_LOADING, STOP_LOADING, SEARCH_IMPORTS } from './constants';

const initialState = fromJS({
  list: [],
  loading: false,
  q: '',
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
      break;
    default:
  }
  return newState;
};

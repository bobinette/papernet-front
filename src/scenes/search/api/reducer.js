import { fromJS } from 'immutable';

import { SEARCH_IMPORTED, SEARCH_UPDATE_Q, SEARCH_RECEIVE } from './constants';

const initialState = fromJS({
  q: '',
  results: {},
});

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case SEARCH_IMPORTED: {
      const index = newState.getIn(['results', action.paper.source, 'papers']).findKey(
        p => p.get('reference') === action.paper.reference,
      );
      newState = newState.setIn(['results', action.paper.source, 'papers', index], fromJS(action.paper));
      break;
    }
    case SEARCH_RECEIVE:
      newState = newState.set('results', fromJS(action.results));
      break;
    case SEARCH_UPDATE_Q:
      newState = newState.set('q', action.q);
      break;
    default:
  }
  return newState;
};

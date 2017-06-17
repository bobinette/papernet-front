import { fromJS } from 'immutable';

import {
  SEARCH_IMPORTED,
  SEARCH_LOADING_START,
  SEARCH_LOADING_STOP,
  SEARCH_UPDATE_Q,
  SEARCH_RECEIVE,
} from './constants';

const initialState = fromJS({
  q: '',
  loading: false,
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
      if (action.sources) {
        newState = newState.withMutations((s) => {
          action.sources.forEach((source) => {
            s.setIn(['results', source], fromJS(action.results[source]));
          });
        });
      } else {
        newState = newState.set('results', fromJS(action.results));
      }
      break;
    case SEARCH_UPDATE_Q:
      newState = newState.set('q', action.q);
      break;
    case SEARCH_LOADING_START:
      newState = newState.set('loading', true);
      break;
    case SEARCH_LOADING_STOP:
      newState = newState.set('loading', false);
      break;
    default:
  }
  return newState;
};

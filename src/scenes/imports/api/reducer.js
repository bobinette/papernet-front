import { fromJS } from 'immutable';

import { IMPORTS_PAPERS_RECEIVED, IMPORTS_IMPORT_START, IMPORTS_IMPORT_DONE } from './constants';

const initialState = fromJS({
  papers: [],
  status: {
    loading: false,
    imported: false,
  },
});

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case IMPORTS_PAPERS_RECEIVED:
      newState = newState.set('papers', fromJS(action.papers));
      newState = newState.setIn(['status', 'imported'], false);
      break;
    case IMPORTS_IMPORT_START:
      newState = newState.setIn(['status', 'loading'], true);
      break;
    case IMPORTS_IMPORT_DONE:
      newState = newState.setIn(['status', 'loading'], false);
      newState = newState.setIn(['status', 'imported'], true);
      break;
    default:
  }
  return newState;
};

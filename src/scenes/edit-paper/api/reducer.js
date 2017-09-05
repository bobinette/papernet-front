import { fromJS } from 'immutable';

import { EDIT_PAPER_FETCH, EDIT_PAPER_RECEIVE, EDIT_PAPER_RESET, EDIT_PAPER_UPDATE } from './constants';

const initialState = fromJS({
  paper: {
    title: '',
    summary: '',
    tags: [],
    references: [],
  },
  canLeave: true,
  loading: false,
  found: true,
});

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case EDIT_PAPER_FETCH:
      newState = newState.set('loading', true);
      break;
    case EDIT_PAPER_RECEIVE:
      newState = newState.set('loading', false);
      newState = newState.set('paper', fromJS(action.paper));
      break;
    case EDIT_PAPER_RESET:
      newState = initialState;
      break;
    case EDIT_PAPER_UPDATE:
      newState = newState.set('canLeave', false);
      newState = newState.setIn(['paper', action.key], action.value);
      break;
    default:
  }
  return newState;
};

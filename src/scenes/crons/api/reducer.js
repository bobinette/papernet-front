import { fromJS } from 'immutable';

import { CRONS_RECEIVE } from './constants';

const initialState = fromJS({
  crons: [],
  loading: false,
});

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case CRONS_RECEIVE: {
      newState = newState.set('crons', fromJS(action.crons));
      break;
    }
    default:
      break;
  }

  return newState;
};

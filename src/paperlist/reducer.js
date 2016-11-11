import { fromJS } from 'immutable';

import { RECEIVE_PAPER_LIST } from './constants';

const initialState = fromJS([]);

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case RECEIVE_PAPER_LIST:
      newState = fromJS(action.paperList);
      break;
    default:
  }
  return newState;
};

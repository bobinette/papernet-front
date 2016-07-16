import {Map, fromJS} from 'immutable';

import { RECEIVE_PAPER, UPDATE_PAPER } from 'constants/events';

const receivePaper = (newPaper) => fromJS(newPaper);

const updatePaper = (key, value, state) => {
  const paper = state.set(key, value);
  return paper;
};

export default (state=Map(), action) => {
  switch(action.type) {
  case RECEIVE_PAPER: return receivePaper(action.paper);
  case UPDATE_PAPER: return updatePaper(action.key, action.value, state);
  }
  return state;
};

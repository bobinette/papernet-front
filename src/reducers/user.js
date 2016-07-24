import { Map, fromJS } from 'immutable';

import { RECEIVE_USER, UPDATE_USER } from 'constants/events';

const receiveUser = (newUser) => fromJS(newUser);

const updateUser = (key, value, state) => {
  const paper = state.set(key, value);
  return paper;
};

export default (state=Map(), action) => {
  switch(action.type) {
  case RECEIVE_USER: return receiveUser(action.user);
  case UPDATE_USER: return updateUser(action.key, action.value, state);
  }
  return state;
};

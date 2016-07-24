import { Map, fromJS } from 'immutable';

import { RECEIVE_USER } from 'constants/events';

const receiveUser = (newUser) => fromJS(newUser);

export default (state=Map(), action) => {
  switch(action.type) {
  case RECEIVE_USER: return receiveUser(action.user);
  }
  return state;
};

import { fromJS } from 'immutable';

import { PROVIDERS_RECEIVE } from './constants';

const initialState = fromJS({
  providers: [],
});

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case PROVIDERS_RECEIVE:
      newState = newState.set('providers', fromJS(action.providers));
      break;
    default:
  }
  return newState;
};

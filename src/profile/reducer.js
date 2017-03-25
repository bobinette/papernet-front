import { fromJS } from 'immutable';

import { TEAMS_RECEIVE } from './constants';

const initialState = fromJS({
  teams: [],
});

export default (state = initialState, action) => {
  let newState = state;
  switch (action.type) {
    case TEAMS_RECEIVE:
      newState = newState.set('teams', fromJS(action.teams));
      break;
    default:
  }
  return newState;
};

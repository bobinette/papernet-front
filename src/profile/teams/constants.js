import { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

export const TEAMS_FETCH = 'TEAMS_FETCH';
export const TEAMS_RECEIVE = 'TEAMS_RECEIVE';

export const TEAMS_KICK = 'TEAMS_KICK';
export const TEAMS_INVITE = 'TEAMS_INVITE';

export const teamPropType = ImmutablePropTypes.contains({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  members: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    admin: PropTypes.bool.isRequired,
  })).isRequired,
});

import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

export const TEAMS_CREATE = 'TEAMS_CREATE';
export const TEAMS_DELETE = 'TEAMS_DELETE';
export const TEAMS_FETCH = 'TEAMS_FETCH';
export const TEAMS_INVITE = 'TEAMS_INVITE';
export const TEAMS_KICK = 'TEAMS_KICK';
export const TEAMS_RECEIVE = 'TEAMS_RECEIVE';
export const TEAMS_SHARE = 'TEAMS_SHARE';

export const teamPropType = ImmutablePropTypes.contains({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  members: ImmutablePropTypes.listOf(ImmutablePropTypes.contains({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    admin: PropTypes.bool.isRequired,
  })).isRequired,
});

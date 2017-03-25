import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { loadCookie, me } from 'auth/actions';
import { userPropType } from 'utils/constants';

import { TEAMS_FETCH, TEAMS_INVITE, TEAMS_KICK, teamPropType } from './constants';
import TeamView from './team-view';

import './teams.scss';

const mapStateToProps = state => ({
  user: state.user.get('user'),
  teams: state.profile.get('teams'),
});

class TeamsContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: userPropType.isRequired,
    teams: ImmutablePropTypes.listOf(teamPropType),
  };

  constructor(props) {
    super(props);

    this.onInvite = ::this.onInvite;
    this.onKick = ::this.onKick;

    this.props.dispatch(loadCookie());
    this.props.dispatch(me());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.props.dispatch({ type: TEAMS_FETCH });
    }
  }

  onInvite(teamID, email) {
    this.props.dispatch({ type: TEAMS_INVITE, teamID, email });
  }

  onKick(teamID, userID) {
    this.props.dispatch({ type: TEAMS_KICK, teamID, userID });
  }

  render() {
    const { teams, user } = this.props;

    return (
      <div>
        <h2>Teams</h2>
        <div className="TeamsContainer">
          {teams.map(t => (
            <TeamView
              key={t.get('id')}
              team={t}
              user={user}
              onInvite={this.onInvite}
              onKick={this.onKick}
            />
            )).toJS()}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TeamsContainer);

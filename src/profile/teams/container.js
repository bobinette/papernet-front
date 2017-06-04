import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { userPropType } from 'utils/constants';

import TextInput from 'components/input/text';

import { TEAMS_CREATE, TEAMS_DELETE, TEAMS_FETCH, TEAMS_INVITE, TEAMS_KICK, teamPropType } from './constants';
import TeamView from './team-view';

import './teams.scss';

const mapStateToProps = state => ({
  user: state.auth.get('user'),
  teams: state.profile.get('teams'),
});

class TeamsContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: userPropType.isRequired,
    teams: ImmutablePropTypes.listOf(teamPropType).isRequired,
  };

  constructor(props) {
    super(props);

    this.onChange = ::this.onChange;
    this.onDelete = ::this.onDelete;
    this.onKeyPress = ::this.onKeyPress;
    this.onInvite = ::this.onInvite;
    this.onKick = ::this.onKick;

    this.state = { newTeamName: '' };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.props.dispatch({ type: TEAMS_FETCH });
    }
  }

  onChange(text) {
    this.setState({ newTeamName: text });
  }

  onDelete(teamID) {
    this.props.dispatch({ type: TEAMS_DELETE, teamID });
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.dispatch({ type: TEAMS_CREATE, name: this.state.newTeamName });
      this.setState({ newTeamName: '' });
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
              onDelete={this.onDelete}
              onInvite={this.onInvite}
              onKick={this.onKick}
              team={t}
              user={user}
            />
            )).toJS()}
          <TextInput
            className="TeamsContainer__NewTeamInput"
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            placeholder="Name of the new team"
            value={this.state.newTeamName}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TeamsContainer);

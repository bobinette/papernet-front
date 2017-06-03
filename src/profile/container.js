import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import NavBar from 'components/navbar';
import { userPropType } from 'utils/constants';

import { TEAMS_FETCH } from './constants';
import ProfileView from './view';
import { TeamsContainer } from './teams';

const mapStateToProps = state => ({
  user: state.auth.get('user'),
  teams: state.profile.get('teams'),
});

class ProfileContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: userPropType.isRequired,
    teams: ImmutablePropTypes.list.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.props.dispatch({ type: TEAMS_FETCH });
    }
  }

  render() {
    const { user, teams } = this.props;

    return (
      <div className="ProfileContainer">
        <NavBar />
        <div className="ProfileContainer container">
          <div className="col-md-10 offset-md-1">
            <ProfileView
              user={user}
              teams={teams}
            />
            <TeamsContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ProfileContainer);

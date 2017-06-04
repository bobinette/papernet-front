import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { TEAMS_FETCH, TEAMS_SHARE, teamPropType } from 'profile/teams/constants';
import { paperPropType, userPropType } from 'utils/constants';

import { deletePaper, getPaper } from '../actions';
import NotFoundView from '../notfound';
import PaperView from './view';

const mapStateToProps = state => ({
  found: state.paper.get('found'),
  loading: state.paper.get('loading'),
  paper: state.paper.get('paper'),
  teams: state.profile.get('teams'),
  user: state.auth.get('user'),
});

class PaperViewContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    found: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    paper: paperPropType.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    teams: ImmutablePropTypes.listOf(teamPropType).isRequired,
    user: userPropType.isRequired,
  };

  constructor(props) {
    super(props);

    this.onDelete = ::this.onDelete;
    this.onShare = ::this.onShare;
  }

  componentWillMount() {
    const { dispatch, params } = this.props;
    dispatch(getPaper(params.id));
    this.props.dispatch({ type: TEAMS_FETCH });
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.params.id !== this.props.params.id) {
      dispatch(getPaper(nextProps.params.id));
    }

    if (nextProps.user !== this.props.user) {
      this.props.dispatch({ type: TEAMS_FETCH });
    }
  }

  onShare(paperID, teamIDs) {
    teamIDs.forEach(teamID => this.props.dispatch({ type: TEAMS_SHARE, teamID, paperID }));
  }

  onDelete() {
    this.props.dispatch(deletePaper()).then(
      () => { browserHistory.push('/papers'); },
    );
  }

  render() {
    const { found, loading, paper, teams } = this.props;

    // Dangerous. Replace with a loading page.
    if (loading) return null;

    if (!found) return <NotFoundView />;

    return (
      <div className="PaperContainer container">
        <PaperView onDelete={this.onDelete} onShare={this.onShare} paper={paper} teams={teams} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(PaperViewContainer);

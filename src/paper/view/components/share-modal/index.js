import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Map, fromJS } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import classNames from 'classnames';

import Modal from 'react-modal';

import { teamPropType } from 'profile/teams/constants';
import { paperPropType } from 'utils/constants';

import './share-modal.scss';

class ShareModal extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onShare: PropTypes.func.isRequired,
    paper: paperPropType.isRequired,
    teams: ImmutablePropTypes.listOf(teamPropType).isRequired,
  };

  constructor(props) {
    super(props);

    this.onClose = ::this.onClose;
    this.onShare = ::this.onShare;

    const shareWith = this.seedTeams(props.teams);
    this.state = { shareWith };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.teams !== this.props.teams) {
      const shareWith = this.seedTeams(nextProps.teams);
      this.setState({ shareWith });
    }
  }

  onClose() {
    const shareWith = this.seedTeams(this.props.teams);
    this.setState({ shareWith });
    this.props.onClose();
  }

  onSelectTeam(teamID, permission) {
    return (e) => {
      const { shareWith } = this.state;
      this.setState({ shareWith: shareWith.setIn([teamID, permission, 'checked'], e.target.checked) });
    };
  }

  onShare() {
    const teams = this.state.shareWith
      .filter(team => !team.getIn(['see', 'disabled']))
      .map(team => fromJS({
        canEdit: team.getIn(['edit', 'checked']),
        canSee: team.getIn(['see', 'checked']),
      }));

    this.props.onShare(teams);
  }

  seedTeams(teams) {
    const { paper } = this.props;
    return Map().withMutations((s) => {
      teams.forEach((team) => {
        const canSee = team.get('canSee').indexOf(paper.get('id')) !== -1;
        const canEdit = team.get('canEdit').indexOf(paper.get('id')) !== -1;
        s.set(team.get('id'), fromJS({
          see: {
            checked: canSee,
            disabled: canSee,
          },
          edit: {
            checked: canEdit,
            disabled: canEdit,
          },
        }));
      });
    });
  }

  render() {
    const { isOpen, teams } = this.props;
    const { shareWith } = this.state;

    return (
      <Modal
        className="ShareModal"
        overlayClassName="ShareModalOverlay"
        isOpen={isOpen}
        onRequestClose={this.onClose}
        closeTimeoutMS={0}
        contentLabel="Share-paper-modal"
      >
        <h4 className="ShareModal__Header">Share paper with teams</h4>
        <div className="ShareModal__Content">
          <span>Share with:</span>
          {
            teams.map(team => (
              <div className="ShareModal__TeamCheckbox" key={team.get('id')}>
                <div className={classNames({ 'text-muted': shareWith.getIn([team.get('id'), 'see', 'disabled']) })}>
                  <label className="form-check-label" htmlFor={`form-check-input-team-${team.get('id')}`}>
                    <input
                      id={`form-check-input-team-${team.get('id')}`}
                      className="form-check-input"
                      type="checkbox"
                      checked={shareWith.getIn([team.get('id'), 'see', 'checked'])}
                      disabled={shareWith.getIn([team.get('id'), 'see', 'disabled'])}
                      onChange={this.onSelectTeam(team.get('id'), 'see')}
                    />
                    {team.get('name')}
                  </label>
                </div>
                <div
                  className={classNames(
                    'ShareModal__TeamCheckbox__EditPermission',
                    { 'text-muted': shareWith.getIn([team.get('id'), 'edit', 'disabled']) },
                  )}
                >
                  <small>
                    <label className="form-check-label" htmlFor={`form-check-input-team-${team.get('id')}-edit`}>
                      <input
                        id={`form-check-input-team-${team.get('id')}-edit`}
                        className="form-check-input"
                        type="checkbox"
                        checked={shareWith.getIn([team.get('id'), 'edit', 'checked'])}
                        disabled={shareWith.getIn([team.get('id'), 'edit', 'disabled'])}
                        onChange={this.onSelectTeam(team.get('id'), 'edit')}
                      />
                      Give edit permission
                    </label>
                  </small>
                </div>
              </div>
            ))
          }
        </div>
        <div className="ShareModal__Footer">
          <button type="button" className="btn btn-link" onClick={this.onClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={this.onShare}>Share</button>
        </div>
      </Modal>
    );
  }
}

export default ShareModal;

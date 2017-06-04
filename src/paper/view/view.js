import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import moment from 'moment';

import Modal from 'react-modal';
import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

import SplitDropdown from 'components/dropdown/split';
import Markdown from 'components/markdown';
import NavBar, { NAVBAR_HOME } from 'components/navbar';
import TagList from 'components/taglist';

import { teamPropType } from 'profile/teams/constants';
import { paperPropType } from 'utils/constants';

import './view.scss';

const urlRegex = new RegExp(
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/,
);

class PaperView extends Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    onShare: PropTypes.func.isRequired,
    paper: paperPropType.isRequired,
    teams: ImmutablePropTypes.listOf(teamPropType).isRequired,
  };

  constructor(props) {
    super(props);

    this.onCloseShareDialog = ::this.onCloseShareDialog;
    this.onOpenShareDialog = ::this.onOpenShareDialog;
    this.onShare = ::this.onShare;

    this.state = { shareDialogOpen: false, shareWith: List() };
  }

  onOpenShareDialog() {
    this.setState({ shareDialogOpen: true });
  }

  onCloseShareDialog() {
    this.setState({ shareDialogOpen: false, shareWith: List() });
  }

  onSelectTeam(teamID) {
    return (e) => {
      const { shareWith } = this.state;
      if (e.target.checked) {
        if (shareWith.indexOf(teamID) === -1) {
          this.setState({ shareWith: shareWith.push(teamID) });
        }
      } else {
        const index = shareWith.indexOf(teamID);
        if (index >= 0) {
          this.setState({ shareWith: shareWith.delete(index) });
        }
      }
    };
  }

  onShare() {
    const { onShare, paper } = this.props;
    const { shareWith } = this.state;
    onShare(paper.get('id'), shareWith.toJS());
    this.onCloseShareDialog();
  }

  renderAuthors() {
    const { paper } = this.props;
    const authors = paper.get('authors') || List();

    if (authors.size === 0) return null;

    return (
      <div>
        <h2>Authors</h2>
        <ul>{authors.map(author => <li key={author}>{author}</li>)}</ul>
      </div>
    );
  }

  renderReferences() {
    const { paper } = this.props;
    const references = paper.get('references') || List();

    if (references.size === 0) return null;

    return (
      <div>
        <h2>References</h2>
        <ul>
          {
            references.map((ref) => {
              let elt = ref;
              if (elt.match(urlRegex)) {
                elt = <a href={ref}>{ref}</a>;
              }
              return <li key={ref}>{elt}</li>;
            })
          }
        </ul>
      </div>
    );
  }

  renderSplitButton() {
    const { onDelete, paper } = this.props;

    if (!paper.get('id')) return null;

    return (
      <SplitDropdown
        btnStyle="inverse-primary"
        onClick={() => browserHistory.push(`/papers/${paper.get('id')}/edit`)}
        menu={[
          <button key="share" className="btn dropdown-item" onClick={this.onOpenShareDialog}>Share</button>,
          <div key="dropdown-divider-1" className="dropdown-divider" />,
          <button key="delete" className="btn dropdown-item" onClick={onDelete}>Delete</button>,
        ]}
        title="Edit"
      />
    );
  }

  render() {
    const { paper, teams } = this.props;
    const { shareWith } = this.state;

    const tags = paper.get('tags') || List();

    return (
      <div className="PaperView">
        <NavBar activeTab={NAVBAR_HOME}>
          {this.renderSplitButton()}
        </NavBar>
        { paper.get('id') &&
          <div>
            <div className="PaperView__Content row">
              <TagList className="col-md-10 offset-md-1" tags={tags} />
              <div className="col-md-10 offset-md-1" >
                <small
                  className="text-muted"
                  data-for={paper.get('id').toString()}
                  data-tip
                >
                  <Tooltip
                    placement="bottom"
                    mouseEnterDelay={0.3}
                    overlay={<small>{moment(paper.get('updatedAt')).format('LLL')}</small>}
                  >
                    <span>Modified {moment(paper.get('updatedAt')).fromNow()}</span>
                  </Tooltip>
                </small>
              </div>
              <div className="col-md-10 offset-md-1">
                <h1 className="display-4">{paper.get('title')}</h1>
                <Markdown text={paper.get('summary')} />
                {this.renderReferences()}
                {this.renderAuthors()}
              </div>
            </div>
            <Modal
              className="Modal"
              isOpen={this.state.shareDialogOpen}
              onRequestClose={this.onCloseShareDialog}
              closeTimeoutMS={0}
              contentLabel="Share-paper-modal"
            >
              <h1>Share paper with teams</h1>
              <div>
                <p>Share with:</p>
                {
                  teams.map(team => (
                    <div key={team.get('id')}>
                      <label className="form-check-label" htmlFor={`form-check-input-team-${team.get('id')}`}>
                        <input
                          id={`form-check-input-team-${team.get('id')}`}
                          className="form-check-input"
                          type="checkbox"
                          checked={shareWith.contains(team.get('id'))}
                          onChange={this.onSelectTeam(team.get('id'))}
                        />
                        {team.get('name')}
                      </label>
                    </div>
                  ))
                }
              </div>
              <div className="Modal__Footer">
                <button type="button" className="btn btn-link" onClick={this.onCloseShareDialog}>Cancel</button>
                <button type="button" className="btn btn-primary" onClick={this.onShare}>Share</button>
              </div>
            </Modal>
          </div>
        }
      </div>
    );
  }
}

export default PaperView;

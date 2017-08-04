import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import moment from 'moment';

import PropTypes from 'prop-types';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

import SplitDropdown from 'components/dropdown/split';
import Markdown from 'components/markdown';
import NavBar, { NAVBAR_HOME } from 'components/navbar';
import TagList from 'components/taglist';

import { teamPropType } from 'profile/teams/constants';
import { paperPropType } from 'utils/constants';

import ShareModal from './components/share-modal';

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

    this.state = { shareModalIsOpen: false };
  }

  onOpenShareDialog() {
    this.setState({ shareModalIsOpen: true });
  }

  onCloseShareDialog() {
    this.setState({ shareModalIsOpen: false });
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

  onShare(teams) {
    this.props.onShare(teams);
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
    const { shareModalIsOpen } = this.state;

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
            <ShareModal
              isOpen={shareModalIsOpen}
              onClose={this.onCloseShareDialog}
              onShare={this.onShare}
              paper={paper}
              teams={teams}
            />
          </div>
        }
      </div>
    );
  }
}

export default PaperView;

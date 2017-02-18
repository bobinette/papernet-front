import React, { Component } from 'react';
import { Link } from 'react-router';
import { List } from 'immutable';

import moment from 'moment';

import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

import Markdown from 'components/markdown';
import NavBar from 'components/navbar';
import TagList from 'components/taglist';

import { paperPropType } from 'utils/constants';

import './view.scss';

const urlRegex = new RegExp(
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
);

class PaperView extends Component {

  static propTypes = {
    paper: paperPropType.isRequired,
  };

  renderReferences() {
    const { paper } = this.props;
    const references = paper.get('references') || List();

    if (references.size === 0) return null;

    return (
      <div>
        <h2>References</h2>
        <ul>
          {
            references.map((ref, i) => {
              let elt = ref;
              if (elt.match(urlRegex)) {
                elt = <a href={ref}>{ref}</a>;
              }
              return <li key={i}>{elt}</li>;
            })
          }
        </ul>
      </div>
    );
  }

  renderAuthors() {
    const { paper } = this.props;
    const authors = paper.get('authors') || List();

    if (authors.size === 0) return null;

    return (
      <div>
        <h2>Authors</h2>
        <ul>{authors.map((author, i) => <li key={i}>{author}</li>)}</ul>
      </div>
    );
  }

  render() {
    const { paper } = this.props;

    if (!paper.get('id')) return null;

    const tags = paper.get('tags') || List();

    return (
      <div className="PaperView">
        <NavBar
          items={[
            { element: <Link className="nav-link" to={'/papers'}>Home</Link>, active: true },
            { element: <Link className="nav-link" to={'/arxiv'}>Arxiv</Link>, active: false },
          ]}
          rightItems={[
            { element: <Link className="btn btn-outline-primary" to={`/papers/${paper.get('id')}/edit`}>Edit</Link> },
          ]}
        />
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
      </div>
    );
  }
}

export default PaperView;

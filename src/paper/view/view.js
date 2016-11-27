import React from 'react';

import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Link } from 'react-router';

import Markdown from 'components/markdown';
import TagList from 'components/taglist';

import './view.scss';

const PaperView = ({ paper }) => {
  const tags = paper.get('tags') || List();

  return (
    <div className="PaperView">
      <nav className="navbar navbar-fixed-top navbar-light bg-faded">
        <Link className="navbar-brand" to={'/papers'}>Papernet</Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className="nav-link" to={`/papers/${paper.get('id')}/edit`}>Edit</Link>
          </li>
        </ul>
      </nav>
      <div className="PaperView__Content row">
        <TagList className="col-md-10 offset-md-1" tags={tags} />
        <div className="col-md-10 offset-md-1">
          <h1 className="display-3">{paper.get('title')}</h1>
          <Markdown text={paper.get('summary')} />
        </div>
      </div>
    </div>
  );
};

PaperView.propTypes = {
  paper: ImmutablePropTypes.shape({
    title: ImmutablePropTypes.string,
  }).isRequired,
};

export default PaperView;

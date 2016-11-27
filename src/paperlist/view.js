import React, { PropTypes } from 'react';

import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Link } from 'react-router';

import TagList from 'components/taglist';
import Text from 'components/input/text';

import { paperPropType } from 'utils/constants';

import './view.scss';

const extractAbstract = (text) => {
  let end = text.indexOf('#');
  if (end === -1) {
    end = text.length;
  }

  return text.substring(0, end);
};

const PaperListViewRow = ({ paper }) => {
  const tags = paper.get('tags') || List();
  let abstract = extractAbstract(paper.get('summary'));
  let tooLong = false;

  if (abstract && abstract.length > 200) {
    abstract = abstract.substring(0, 197);
    tooLong = true;
  }
  return (
    <div className="PaperListViewRow card">
      <div className="card-block" to={`/papers/${paper.get('id')}`}>
        <Link to={`/papers/${paper.get('id')}`}>
          <h5 className="card-title">{paper.get('title')}</h5>
          {abstract !== null ?
            <div className="card-text">{abstract}{tooLong ? '...' : null}</div>
            : null
          }
        </Link>
      </div>
      <div className="PaperListViewRow__Tags card-footer">
        <i className="fa fa-tag" />
        <TagList tags={tags} max={5} />
      </div>
    </div>
  );
};

PaperListViewRow.propTypes = {
  paper: paperPropType,
};

const PaperListView = ({ onSearch, papers, search }) => (
  <div className="PaperListView container">
    <nav className="navbar navbar-fixed-top navbar-light bg-faded">
      <span className="navbar-brand">Papernet</span>
    </nav>
    <div className="PaperListView__Content">
      <div className="PaperListView__Search">
        <Text
          className="PaperListView__Search__Input"
          onChange={onSearch}
          placeholder="Search by title..."
          value={search}
        />
        <i className="fa fa-search" />
      </div>
      <Link className="PaperListView__AddButton col-xs-12" to="/papers/new">
        <i className="fa fa-plus-circle" />Add paper
      </Link>
      <ul className="col-xs-12 container">
        {papers.map((paper, i) => (
          <li className="col-md-10 offset-md-1" key={i} >
            <PaperListViewRow paper={paper} />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

PaperListView.propTypes = {
  onSearch: PropTypes.func.isRequired,
  papers: ImmutablePropTypes.listOf(paperPropType).isRequired,
  search: PropTypes.string.isRequired,
};

export default PaperListView;

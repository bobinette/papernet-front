import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Link } from 'react-router';

import Text from 'components/input/text';

import { paperPropType } from 'utils/constants';

import './view.scss';

const PaperListViewRow = ({ paper }) => (
  <Link className="PaperListViewRow" to={`/papers/${paper.get('id')}`}>
    {paper.get('title')}
  </Link>
);

PaperListViewRow.propTypes = {
  paper: paperPropType,
};

const PaperListView = ({ onSearch, papers, search }) => (
  <div className="PaperListView">
    <div className="PaperListView__Search">
      <Text
        className="PaperListView__Search__Input"
        onChange={onSearch}
        placeholder="Search by title..."
        value={search}
      />
      <i className="mdi mdi-magnify" />
    </div>
    <Link className="PaperListView__AddButton" to="/papers/new">
      <i className="mdi mdi-plus-circle" />Add paper
    </Link>
    {papers.map((paper, i) => <PaperListViewRow paper={paper} key={i} />)}
  </div>
);

PaperListView.propTypes = {
  onSearch: PropTypes.func.isRequired,
  papers: ImmutablePropTypes.listOf(paperPropType).isRequired,
  search: PropTypes.string.isRequired,
};

export default PaperListView;

import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Link } from 'react-router';

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

const PaperListView = ({ paperList }) => (
  <div className="PaperListView">
    {paperList.map((paper, i) => <PaperListViewRow paper={paper} key={i} />)}
  </div>
);

PaperListView.propTypes = {
  paperList: ImmutablePropTypes.listOf(paperPropType).isRequired,
};

export default PaperListView;

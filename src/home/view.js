import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { paginationPropType, paperPropType, userPropType } from 'utils/constants';

import Pagination from 'components/pagination';

import SearchBar from 'components/input/text/search-bar';

import PaperListViewRow from './components/row';

import './view.scss';

const HomeList = ({ onBookmark, onOffsetChange, pagination, papers, user }) => (
  <div>
    <ul className="container HomeView__List">
      {papers.map((paper, i) => (
        <li className="col-md-12" key={i} >
          <PaperListViewRow paper={paper} user={user.get('user')} onBookmark={onBookmark} />
        </li>
      ))}
    </ul>
    <Pagination
      pagination={pagination}
      onChange={onOffsetChange}
    />
  </div>
);

HomeList.propTypes = {
  onBookmark: PropTypes.func.isRequired,
  onOffsetChange: PropTypes.func.isRequired,
  papers: paperPropType.isRequired,
  pagination: paginationPropType.isRequired,
  user: userPropType.isRequired,
};

const HomeView = ({ filters, onBookmark, onFilterChange, onOffsetChange, pagination, papers, user }) => (
  <div className="HomeView container">
    <div className="HomeView__Content row">
      <SearchBar
        className="col-xs-8 offset-xs-2"
        onChange={v => onFilterChange('q', v)}
        placeholder="Search by title or tags..."
        value={filters.get('q')}
      />
    </div>
    <div className="HomeView__List row">
      <div className="col-md-10 offset-md-1">
        <HomeList
          pagination={pagination}
          papers={papers}
          onBookmark={onBookmark}
          onOffsetChange={onOffsetChange}
          user={user}
        />
      </div>
    </div>
  </div>
);

HomeView.propTypes = {
  filters: ImmutablePropTypes.contains({
    bookmarked: PropTypes.bool,
  }).isRequired,
  onBookmark: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onOffsetChange: PropTypes.func.isRequired,
  pagination: paginationPropType.isRequired,
  papers: ImmutablePropTypes.listOf(paperPropType).isRequired,
  user: ImmutablePropTypes.contains({
    token: PropTypes.string,
    user: userPropType,
  }).isRequired,
};

export default HomeView;

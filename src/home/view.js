import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import classNames from 'classnames';

import { paginationPropType, paperPropType, userPropType } from 'utils/constants';

import Pagination from 'components/pagination';

import SearchBar from 'components/input/text/search-bar';

import HomeFilters from './components/filters';
import PaperListViewRow from './components/row';

import './view.scss';

const HomeList = ({ className, onBookmark, onOffsetChange, pagination, papers, user }) => (
  <div className={classNames(className, 'container')}>
    <ul className="HomeList col-md-12">
      {papers.map((paper, i) => (
        <li className="col-md-12" key={i} >
          <PaperListViewRow paper={paper} user={user.get('user')} onBookmark={onBookmark} />
        </li>
      ))}
    </ul>
    <Pagination
      className="col-md-12"
      pagination={pagination}
      onChange={onOffsetChange}
    />
  </div>
);

HomeList.propTypes = {
  className: PropTypes.string,
  onBookmark: PropTypes.func.isRequired,
  onOffsetChange: PropTypes.func.isRequired,
  papers: paperPropType.isRequired,
  pagination: paginationPropType.isRequired,
  user: userPropType.isRequired,
};

HomeList.defaultProps = {
  className: '',
};

const HomeView = ({ facets, filters, onBookmark, onFilterChange, onOffsetChange, pagination, papers, user }) => (
  <div className="HomeView container">
    <div className="HomeView__Search row">
      <SearchBar
        className="col-xs-8 offset-xs-2"
        onChange={v => onFilterChange('q', v)}
        placeholder="Search by title or tags..."
        value={filters.get('q')}
      />
    </div>
    <div className="HomeView__Content row">
      <div className="HomeView__Filters col-md-3 container">
        <HomeFilters
          facets={facets}
          filters={filters}
          onFilterChange={onFilterChange}
        />
      </div>
      <HomeList
        className="HomeView__List col-md-9"
        pagination={pagination}
        papers={papers}
        onBookmark={onBookmark}
        onOffsetChange={onOffsetChange}
        user={user}
      />
    </div>
  </div>
);

HomeView.propTypes = {
  facets: ImmutablePropTypes.map,
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

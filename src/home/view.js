import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { paginationPropType, paperPropType, userPropType } from 'utils/constants';

import NavBar from 'components/navbar';
import Pagination from 'components/pagination';

import Filters from './components/filters';
import PaperListViewRow from './components/row';

import './view.scss';

const HomeList = ({ onBookmark, onOffsetChange, pagination, papers, user }) => (
  <div>
    <Pagination
      pagination={pagination}
      onChange={onOffsetChange}
    />
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
    <NavBar
      items={[
        {
          element: <Link className="nav-link" to={'/papers'}>Home</Link>,
          active: true,
        },
        {
          element: <Link className="nav-link" to={'/imports'}>Imports</Link>,
          active: false,
        },
      ]}
      rightItems={[
        {
          element: (
            <Link className="btn btn-outline-primary" to={'/papers/new'}>New</Link>
          ),
        },
      ]}
    />
    <div className="HomeView__Content">
      <Filters
        className="col-xs-8 offset-xs-2"
        filters={filters}
        onFilterChange={onFilterChange}
      />
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

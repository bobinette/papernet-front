import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { paperPropType, userPropType } from 'utils/constants';

import NavBar from 'components/navbar';

import Filters from './components/filters';
import PaperListViewRow from './components/row';

import './view.scss';

const HomeView = ({ filters, onBookmark, onFilterChange, papers, user }) => (
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
      <ul className="col-xs-12 container HomeView__List">
        {papers.map((paper, i) => (
          <li className="col-md-10 offset-md-1" key={i} >
            <PaperListViewRow paper={paper} user={user.get('user')} onBookmark={onBookmark} />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

HomeView.propTypes = {
  filters: ImmutablePropTypes.contains({
    bookmarked: PropTypes.bool,
  }).isRequired,
  onBookmark: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  papers: ImmutablePropTypes.listOf(paperPropType).isRequired,
  user: ImmutablePropTypes.contains({
    token: PropTypes.string,
    user: userPropType,
  }).isRequired,
};

export default HomeView;

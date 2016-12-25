import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Text from 'components/input/text';

import { paperPropType, userPropType } from 'utils/constants';

import NavBar from 'components/navbar';

import PaperListViewRow from './components/row';

import './view.scss';

const HomeView = ({ filters, onBookmark, onFilterChange, onSearch, papers, search, user }) => (
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
      <div className="col-xs-8 offset-xs-2">
        <div className="HomeView__Search">
          <Text
            className="HomeView__Search__Input"
            onChange={onSearch}
            placeholder="Search by title or tags..."
            value={search}
          />
          <i className="fa fa-search" />
        </div>
        <div className=" HomeView__Filters form-check">
          <label className="form-check-label" htmlFor="bookmark-input">
            <input
              id="bookmark-input"
              className="form-check-input"
              type="checkbox"
              checked={filters.get('bookmarked')}
              onClick={(e) => { onFilterChange('bookmarked', e.target.checked); }}
            />
            Bookmarked
          </label>
        </div>
      </div>
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
  onSearch: PropTypes.func.isRequired,
  papers: ImmutablePropTypes.listOf(paperPropType).isRequired,
  search: PropTypes.string.isRequired,
  user: ImmutablePropTypes.contains({
    token: PropTypes.string,
    user: userPropType,
  }).isRequired,
};

export default HomeView;

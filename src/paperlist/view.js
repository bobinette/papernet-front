import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Text from 'components/input/text';

import { paperPropType, userPropType } from 'utils/constants';

import NavBar from 'components/navbar';

import PaperListViewRow from './components/row';

import './view.scss';

const PaperListView = ({ onBookmark, onSearch, papers, search, user }) => (
  <div className="PaperListView container">
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
    <div className="PaperListView__Content">
      <div className="PaperListView__Search col-xs-8 offset-xs-4">
        <Text
          className="PaperListView__Search__Input"
          onChange={onSearch}
          placeholder="Search by title or tags..."
          value={search}
        />
        <i className="fa fa-search" />
      </div>
      <ul className="col-xs-12 container">
        {papers.map((paper, i) => (
          <li className="col-md-10 offset-md-1" key={i} >
            <PaperListViewRow paper={paper} user={user.get('user')} onBookmark={onBookmark} />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

PaperListView.propTypes = {
  onBookmark: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  papers: ImmutablePropTypes.listOf(paperPropType).isRequired,
  search: PropTypes.string.isRequired,
  user: ImmutablePropTypes.contains({
    token: PropTypes.string,
    user: userPropType,
  }).isRequired,
};

export default PaperListView;

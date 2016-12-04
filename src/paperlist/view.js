import React, { PropTypes } from 'react';

import ImmutablePropTypes from 'react-immutable-proptypes';

import { Link } from 'react-router';

import Text from 'components/input/text';

import { paperPropType, userPropType } from 'utils/constants';

import Dropdown from './components/dropdown';
import PaperListViewRow from './components/row';

import './view.scss';

const PaperListView = ({ onBookmark, onLogin, onLogout, onSearch, papers, search, user }) => (
  <div className="PaperListView container">
    <nav className="navbar navbar-fixed-top navbar-light bg-faded">
      <span className="navbar-brand">Papernet</span>
      <ul className="nav navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to={'/papers/new'}>New</Link>
        </li>
      </ul>
      <ul className="nav navbar-nav pull-xs-right">
        {
          user.get('token') ?
            <Dropdown
              title={user.getIn(['user', 'name'])}
              onLogout={onLogout}
            /> :
              <li className="nav-item active">
                <button
                  className="nav-link btn btn-link PaperListView__LoginButton"
                  onClick={onLogin}
                >
                  Login
                </button>
              </li>
        }
      </ul>
    </nav>
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
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  papers: ImmutablePropTypes.listOf(paperPropType).isRequired,
  search: PropTypes.string.isRequired,
  user: ImmutablePropTypes.contains({
    token: PropTypes.string,
    user: userPropType,
  }).isRequired,
};

export default PaperListView;

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import classNames from 'classnames';

import { userPropType } from 'utils/constants';
import { USER_SIGN_OUT } from 'services/auth/constants';

import Dropdown from './dropdown';

import {
  NAVBAR_ARXIV,
  NAVBAR_HOME,
  NAVBAR_IMPORTS,
  NAVBAR_NONE,
} from './constants';


import logo from './logo-reversed.png';

import './navbar.scss';

const tabs = [
  {
    label: 'Home',
    to: '/papers',
    id: NAVBAR_HOME,
  },
  {
    label: 'Arxiv',
    to: '/arxiv',
    id: NAVBAR_ARXIV,
  },
  {
    label: 'Imports',
    to: '/imports',
    id: NAVBAR_IMPORTS,
  },
];

const mapStateToProps = state => ({
  user: state.auth,
});

const mapDispatchToProps = dispatch => ({
  onLogin: () => browserHistory.push('/login'),
  onLogout: () => dispatch({ type: USER_SIGN_OUT }),
});

const NavBar = ({ activeTab, children, onLogin, onLogout, user }) => (
  <nav className="navbar navbar-fixed-top navbar-inverse bg-primary">
    <div className="container">
      <Link className="navbar-brand NavBar__Brand" to={'/papers'}>
        <img
          className="d-inline-block align-top"
          src={logo}
          width="30"
          height="30"
          alt=""
        />
        Papernet
      </Link>
      <ul className="nav navbar-nav NavBar__LeftItems">
        {
          tabs.map(tab => (
            <NavBar.Element
              key={tab.id}
              active={activeTab === tab.id}
              element={<Link className="nav-link" to={tab.to}>{tab.label}</Link>}
            />
          ))
        }
      </ul>
      <ul className="nav navbar-nav pull-xs-right NavBar__RightItems">
        {
          user.getIn(['token', 'token']) ?
            <Dropdown
              className="NavBar__DropDown"
              title={user.getIn(['user', 'name']) || user.getIn(['user', 'email']) || 'John Doe'}
              onLogout={onLogout}
            /> :
            <li className="nav-item active">
              <button
                className="nav-link btn btn-link NavBar__LoginButton"
                onClick={onLogin}
              >
                Sign in
              </button>
            </li>
        }
      </ul>
      <div className="nav nav-item navbar-nav pull-xs-right NavBar__Children">
        {children}
      </div>
    </div>
  </nav>
);

NavBar.propTypes = {
  activeTab: PropTypes.oneOf([
    NAVBAR_ARXIV,
    NAVBAR_HOME,
    NAVBAR_IMPORTS,
    NAVBAR_NONE,
  ]),
  children: PropTypes.node,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  user: userPropType.isRequired,
};

NavBar.defaultProps = {
  activeTab: null,
  items: [],
  children: null,
};

NavBar.Element = ({ active, element }) => {
  if (!element) return null;

  return (
    <li className={classNames('nav-item', { active })}>
      {element}
    </li>
  );
};

NavBar.Element.propTypes = {
  active: PropTypes.bool.isRequired,
  element: PropTypes.element.isRequired,
};

export { NavBar };
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

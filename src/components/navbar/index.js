import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import classNames from 'classnames';

import { login, logout } from 'auth/actions';
import { userPropType } from 'utils/constants';

import icon from 'H2O.png';

import Dropdown from './dropdown';

import './navbar.scss';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  onLogin: () => dispatch(login()),
  onLogout: () => dispatch(logout()),
});

const NavBar = ({ items, rightItems, onLogin, onLogout, user }) => (
  <nav className="navbar navbar-fixed-top navbar-light">
    <div className="container">
      <Link className="navbar-brand" to={'/papers'}>
        {<img className="d-inline-block align-top" src={icon} width="30" height="30" alt="" />}
        Papernet
      </Link>
      <ul className="nav navbar-nav">
        {items.map((item, i) => (
          <li key={i} className={classNames('nav-item', { active: item.active })}>
            {item.element}
          </li>
        ))}
      </ul>
      <ul className="nav navbar-nav pull-xs-right">
        {rightItems.map((item, i) => (
          <li key={i} className={classNames('nav-item', { active: item.active })}>
            {item.element}
          </li>
        ))}
        {
          user.get('token') ?
            <Dropdown
              title={user.getIn(['user', 'name']) || 'John Doe'}
              onLogout={onLogout}
            /> :
              <li className="nav-item active">
                <button
                  className="nav-link btn btn-link"
                  onClick={onLogin}
                >
                  Login
                </button>
              </li>
        }
      </ul>
    </div>
  </nav>
);

NavBar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    element: PropTypes.element.isRequired,
    active: PropTypes.bool,
  })),
  rightItems: PropTypes.arrayOf(PropTypes.shape({
    element: PropTypes.element.isRequired,
    active: PropTypes.bool,
  })),
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  user: userPropType.isRequired,
};

NavBar.defaultProps = {
  items: [],
  rightItems: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

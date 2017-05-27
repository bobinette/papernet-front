import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import classNames from 'classnames';

import { logout } from 'auth/actions';
import { userPropType } from 'utils/constants';

import Dropdown from './dropdown';

import './navbar.scss';

const mapStateToProps = state => ({
  user: state.auth,
});

const mapDispatchToProps = dispatch => ({
  onLogin: () => browserHistory.push('/login'),
  onLogout: () => dispatch(logout()),
});

const NavBar = ({ items, rightItems, onLogin, onLogout, user }) => (
  <nav className="navbar navbar-fixed-top navbar-light">
    <div className="container">
      <Link className="navbar-brand" to={'/papers'}>
        <img
          className="d-inline-block align-top"
          src="https://papernet.bobi.space/app/assets/H2O.png"
          width="30"
          height="30"
          alt=""
        />
        Papernet
      </Link>
      <ul className="nav navbar-nav NavBar__LeftItems">
        {items.map((item, i) => (
          <NavBar.Element active={item.active} element={item.element} key={i} />
        ))}
      </ul>
      <ul className="nav navbar-nav pull-xs-right NavBar__RightItems">
        {rightItems.map((item, i) => (
          <NavBar.Element active={item.active} element={item.element} key={i} />
        ))}
        {
          user.getIn(['token', 'token']) ?
            <Dropdown
              className="NavBar__DropDown"
              title={user.getIn(['user', 'name']) || 'John Doe'}
              onLogout={onLogout}
            /> :
            <li className="nav-item active">
              <button
                className="nav-link btn btn-link NavBar__LoginButton"
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
    element: PropTypes.element,
    active: PropTypes.bool,
  })),
  rightItems: PropTypes.arrayOf(PropTypes.shape({
    element: PropTypes.element,
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

NavBar.Element = ({ active, element }) => {
  if (!element) return null;

  return (
    <li className={classNames('nav-item', { active })}>
      {element}
    </li>
  );
};

NavBar.Element.propTypes = {
  active: PropTypes.bool,
  element: PropTypes.element,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';

import { logout } from 'login/actions';

import history from 'routing';

import './navbar.scss';

const tabs = [
  {
    index: 0,
    label: 'Home',
    icon: 'mdi-home',
    href: 'home'
  },
  {
    index: 1,
    label: 'Reading list',
    icon: 'mdi-bookmark',
    href: 'readinglist'
  }
];

class NavBar extends Component {
  static propTypes = {
    activeIndex: PropTypes.number,
    dispatch: PropTypes.func,
    username: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogin() {
    history.push('login');
  }

  onLogout() {
    const { dispatch } = this.props;
    dispatch(logout());
  }

  renderTab(tab) {
    const { activeIndex } = this.props;

    const classes = {
      NavBar__Tab: true,
      'NavBar__Tab--active': activeIndex === tab.index
    };

    const iconClasses = {
      mdi: true
    };
    iconClasses[tab.icon] = true;

    const onClick = () => {history.push(tab.href);};

    return (
      <div className={classNames(classes)} key={tab.index} onClick={onClick}>
        <i className={classNames(iconClasses)}/>
        {tab.label}
      </div>
    );
  }

  render() {
    const { username } = this.props;

    const loginClasses = {
      mdi: true,
      'mdi-login': !username,
      'mdi-logout': username && username !== '',
    };

    let loginClick = username === '' ? this.onLogin : this.onLogout;

    return (
      <div className='NavBar'>
        <div className='NavBar__LeftSide'>
          <div className='NavBar__AppName'>Papernet</div>
          <div className='NavBar__Tabs'>
            {tabs.map(t => this.renderTab(t))}
          </div>
        </div>
        <div className='NavBar__Login'>
          <div className='NavBar__Username'>{username}</div>
          <div className='NavBar__LoginButton' onClick={loginClick}><i className={classNames(loginClasses)} /></div>
        </div>
      </div>
    );
  }
}

export default connect()(NavBar);

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router';

import listensToClickOutside from 'react-onclickoutside';

import classNames from 'classnames';

import './dropdown.scss';

class Dropdown extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    onLogout: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  constructor(props) {
    super(props);

    this.onDropdownClick = ::this.onDropdownClick;
    this.onButtonsClicked = ::this.onButtonsClicked;

    this.state = { open: false };
  }

  onButtonsClicked() {
    this.setState({ open: false });
  }

  onDropdownClick() {
    this.setState({ open: !this.state.open });
  }

  handleClickOutside() {
    this.setState({ open: false });
  }

  render() {
    const { className, onLogout, title } = this.props;

    const classes = { open: this.state.open };
    // @TODO: center Link text vertically
    return (
      <li className={classNames('nav-item dropdown active', className, classes)}>
        <button
          className="nav-link dropdown-toggle btn btn-link Dropdown"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={this.onDropdownClick}
          id="profile-dropdown"
        >
          {title}
        </button>
        <div // eslint-disable-line jsx-a11y/no-static-element-interactions
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="profile-dropdown"
          onClick={this.onButtonsClicked}
        >
          <Link className="btn dropdown-item NavBar__DropdownItem" to="/profile">Profile</Link>
          <button className="dropdown-item NavBar__DropdownItem" onClick={onLogout}>Sign out</button>
        </div>
      </li>
    );
  }
}

export default listensToClickOutside(Dropdown);

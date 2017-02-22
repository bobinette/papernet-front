import React, { Component, PropTypes } from 'react';
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
          <Link className="dropdown-item" to="/privacy">Privacy policy</Link>
          <Link className="dropdown-item" to="/terms-of-use">Terms of Use</Link>
          <div className="dropdown-divider" />
          <button className="dropdown-item" onClick={onLogout}>Logout</button>
        </div>
      </li>
    );
  }
}

export default listensToClickOutside(Dropdown);

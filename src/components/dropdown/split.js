import PropTypes from 'prop-types';
import React, { Component } from 'react';

import listensToClickOutside from 'react-onclickoutside';

import classNames from 'classnames';

import './dropdown.scss';

class SplitDropdown extends Component {
  static propTypes = {
    btnStyle: PropTypes.string,
    className: PropTypes.string,
    menu: PropTypes.arrayOf(PropTypes.element).isRequired,
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    btnStyle: 'link',
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
    const { btnStyle, className, menu, title } = this.props;

    const classes = { open: this.state.open };
    return (
      <div className={classNames('btn-group', className, classes)}>
        <button
          className={`btn btn-${btnStyle}`}
          onClick={this.props.onClick}
        >
          {title}
        </button>
        <button
          className={`btn btn-${btnStyle} dropdown-toggle dropdown-toggle-split`}
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded={this.state.open}
          onClick={this.onDropdownClick}
        >
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <div // eslint-disable-line jsx-a11y/no-static-element-interactions
          className="dropdown-menu"
          aria-labelledby="profile-dropdown"
          onClick={this.onButtonsClicked}
        >
          {menu.map(e => e)}
        </div>
      </div>
    );
  }
}

export default listensToClickOutside(SplitDropdown);

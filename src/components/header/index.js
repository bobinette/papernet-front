import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import classNames from 'classnames';

import './header.scss';

class Header extends Component {
  static propTypes = {
    actions: PropTypes.node.isRequired,
    classes: PropTypes.object,
    title: PropTypes.node.isRequired
  }

  static defaultProps = {
    classes: {}
  };

  render() {
    const { actions, classes, title } = this.props;

    classes.Header = true;

    return (
      <div className={classNames(classes)}>
        <div className='Header__Title'>
          {title}
        </div>
        <div className='Header__Actions'>
          {actions}
        </div>
      </div>
    );
  }
}

export default Header;

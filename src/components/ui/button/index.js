import React, { Component, PropTypes } from 'react';

import classNames from 'classnames';

import './button.scss';

class Button extends Component {
  static propTypes = {
    classes: PropTypes.object,
    content: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['default', 'valid', 'danger'])
  }

  static defaultProps = {
    classes: {},
    type: 'default'
  }

  render() {
    const { classes, content, onClick, type } = this.props;

    const cls = Object.assign(classes, {
      Button: true,
      'Button--danger': type === 'danger',
      'Button--valid': type === 'valid'
    });

    return (
      <div className={classNames(cls)} onClick={onClick}>
        {content}
      </div>
    );
  }
}

export default Button;

import React, { Component, PropTypes } from 'react';

import classNames from 'classnames';

import './tag.scss';

class Tag extends Component {
  static propTypes = {
    classes: PropTypes.object,
    onClear: PropTypes.func,
    text: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired
  }

  static defaultProps = {
    classes: {},
    onClear: null
  }

  renderClear() {
    const { onClear } = this.props;
    if (!onClear) return null;

    return (
      <i className='mdi mdi-close Tag__ClearButton' onClick={onClear} />
    );
  }

  render() {
    const { classes, text } = this.props;

    return (
      <div className='Tag'>
        <span className={classNames(classes)} key={'Tag-'+text}>
          {text}
        </span>
        {this.renderClear()}
      </div>
    );
  }
}

export default Tag;

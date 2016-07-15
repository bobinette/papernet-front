import React, { Component, PropTypes } from 'react';

import classNames from 'classnames';

import './checkbox.scss';

class CheckBox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    classes: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
  }

  static defaultProps = {
    checked: false,
    classes: {}
  }

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(check) {
    const { onChange } = this.props;
    onChange(check);
  }

  onChange(e) {
    const { onChange } = this.props;
    onChange(e.target.checked);
  }

  render() {
    const { checked, classes, label } = this.props;

    classes.CheckBox = true;
    const onClick = this.onClick.bind(this, !checked);
    return (
      <div className={classNames(classes)}>
        <input type='checkbox' checked={checked} onChange={this.onChange}/>
        <div className='CheckBox__Label' onClick={onClick}>{label}</div>
      </div>
    );
  }
}

export default CheckBox;

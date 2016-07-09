import React, { Component, PropTypes } from 'react';

import classNames from 'classnames';

import './radio.scss';

class Radio extends Component {
  static propTypes = {
    classes: PropTypes.object,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.any
  }

  static defaultProps = {
    classes: {},
    label: '',
    value: null
  }

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(option) {
    const { onChange, value } = this.props;
    if (option.value === value) return;

    onChange(option);
  }

  renderLabel() {
    const { label } = this.props;

    if (!label) return null;

    return (
      <div className='Radio__Label'>
        {label}
      </div>
    );
  }

  renderOption(option) {
    const { value } = this.props;
    const onClick = this.onClick.bind(this, option);
    return (
      <div className='Radio__Choice' key={option.value}>
        <input type='radio' checked={option.value === value} onChange={onClick}/>
        <span className='Radio__Text' onClick={onClick}>{option.label}</span>
      </div>
    );
  }

  render() {
    const { classes, options } = this.props;

    classes.Radio = true;

    const label = this.renderLabel();
    const inputClasses = {
      Radio__Input: true,
      'Radio__Input--full': !label
    };

    return (
      <div className={classNames(classes)}>
        {label}
        <div className={classNames(inputClasses)}>
          {options.map(opt => this.renderOption(opt))}
        </div>
      </div>
    );
  }
}

export default Radio;

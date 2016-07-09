import React, { Component, PropTypes } from 'react';

import classNames from 'classnames';

import './number.scss';

class NumberInput extends Component {
  static propTypes = {
    classes: PropTypes.object,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }

  static defaultProps = {
    classes: {},
    label: '',
    placeholder: '',
    value: ''
  }

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { onChange } = this.props;
    onChange(parseInt(e.target.value));
  }

  renderLabel() {
    const { label } = this.props;

    if (!label) return null;

    return (
      <div className='Number__Label'>
        {label}
      </div>
    );
  }

  render() {
    const { classes, placeholder, value } = this.props;

    classes.Radio = true;

    const label = this.renderLabel();
    const inputClasses = {
      Number__Input: true,
      'Number__Input--full': !label
    };

    return (
      <div className={classNames(classes)}>
        {label}
        <div className={classNames(inputClasses)}>
          <input
            className='Number__InputField'
            type='number'
            onChange={this.onChange}
            placeholder={placeholder}
            value={value}
          />
        </div>
      </div>
    );
  }
}

export default NumberInput;

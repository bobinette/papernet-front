import React, { Component, PropTypes } from 'react';

import classNames from 'classnames';

import './text.scss';

class Text extends Component {
  static propTypes = {
    className: PropTypes.object,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string
  }

  static defaultProps = {
    className: {},
    onKeyPress: null,
    onFocus: null,
    placeholder: '',
    value: ''
  }

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onBlur() {
    const { onFocus } = this.props;
    if (!onFocus) return;

    onFocus(false);
  }

  onChange(e) {
    const { onChange } = this.props;
    onChange(e.target.value);
  }

  onFocus() {
    const { onFocus } = this.props;
    if (!onFocus) return;

    onFocus(true);
  }

  render() {
    const { className, label, onKeyPress, placeholder, value } = this.props;

    className.Text = true;

    const labelClasses = {
      Text__Label: !!label
    };
    const inputClasses = {
      Text__Input: !!label,
      'Text__Input--full': !label
    };

    return (
      <div className={classNames(className)}>
        <div className={classNames(labelClasses)}>
          {label}
        </div>
        <div className={classNames(inputClasses)}>
          <input
            className='Text__InputField'
            onBlur={this.onBlur}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            type='text'
            value={value}
          />
        </div>
      </div>
    );
  }
}

export default Text;

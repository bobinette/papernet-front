import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './text.scss';

class Text extends Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func,
    onFocus: PropTypes.func,
    password: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  }

  static defaultProps = {
    className: '',
    onKeyPress: null,
    onFocus: null,
    password: false,
    placeholder: '',
    value: '',
  }

  constructor(props) {
    super(props);

    this.onChange = ::this.onChange;
    this.onFocus = ::this.onFocus;
    this.onBlur = ::this.onBlur;
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
    const { className, onKeyPress, password, placeholder, value } = this.props;

    const inputType = password ? 'password' : 'text';
    return (
      <div className={`Text ${className}`}>
        <input
          className="Text__InputField"
          onBlur={this.onBlur}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          type={inputType}
          value={value}
        />
      </div>
    );
  }
}

export default Text;

import React, { Component, PropTypes } from 'react';

// import './text.scss';

class Text extends Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  }

  static defaultProps = {
    className: '',
    onKeyPress: null,
    onFocus: null,
    placeholder: '',
    value: '',
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
    const { className, onKeyPress, placeholder, value } = this.props;

    return (
      <div className={`Text ${className}`}>
        <input
          className="Text__InputField"
          onBlur={this.onBlur}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onKeyPress={onKeyPress}
          placeholder={placeholder}
          type="text"
          value={value}
        />
      </div>
    );
  }
}

export default Text;

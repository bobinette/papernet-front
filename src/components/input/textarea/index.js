import React, { Component, PropTypes } from 'react';

class TextArea extends Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  }

  static defaultProps = {
    className: '',
    placeholder: '',
    value: '',
  }

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { onChange } = this.props;
    onChange(e.target.value);
  }

  render() {
    const { className, placeholder, value } = this.props;

    return (
      <div className={`TextArea ${className}`}>
        <textarea
          className="TextArea__InputField"
          onChange={this.onChange}
          placeholder={placeholder}
          value={value}
        />
      </div>
    );
  }
}

export default TextArea;

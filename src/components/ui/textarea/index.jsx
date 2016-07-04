import React, { Component, PropTypes } from 'react';

import classNames from 'classnames';

import './textarea.scss';

class TextArea extends Component {
  static propTypes = {
    className: PropTypes.object,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string
  }

  static defaultProps = {
    className: {},
    placeholder: '',
    value: ''
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
    const { className, label, placeholder, value } = this.props;

    className.TextArea = true;

    const labelClasses = {
      TextArea__Label: !!label
    };
    const inputClasses = {
      TextArea__Input: !!label,
      'TextArea__Input--full': !label
    };

    return (
      <div className={classNames(className)}>
        <div className={classNames(labelClasses)}>
          {label}
        </div>
        <div className={classNames(inputClasses)}>
          <textarea
            className='TextArea__InputField'
            onChange={this.onChange}
            placeholder={placeholder}
            value={value}
          />
        </div>
      </div>
    );
  }
}

export default TextArea;

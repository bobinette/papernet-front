import React, { Component, PropTypes } from 'react';

import classNames from 'classnames';

import './checkbox.scss';

class CheckBox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  }

  static defaultProps = {
    checked: false,
  }

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { onChange } = this.props;
    onChange(e.target.checked);
  }

  render() {
    const { checked, text } = this.props;

    return (
      <div className='CheckBox'>
        <input type='checkbox' checked={checked} onChange={this.onChange}/>
        {text}
      </div>
    );
  }
}

export default CheckBox;

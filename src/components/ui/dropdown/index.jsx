import React, { Component, PropTypes } from 'react';

import classNames from 'classnames';

import ReactDropdown from 'react-dropdown';

import './dropdown.scss';

class Dropdown extends Component {

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

    this.onChange = this.onChange.bind(this);
  }

  onChange (e) {
    const { onChange } = this.props;
    onChange(e.value);
  }

  renderLabel() {
    const { label } = this.props;

    if (!label) return null;

    return (
      <div className='Dropdown__Label'>
        {label}
      </div>
    );
  }

  render() {
    const { classes, options, value } = this.props;

    classes.Dropdown = true;

    const label = this.renderLabel();
    const inputClasses = {
      Dropdown__Input: true,
      'Dropdown__Input--full': !label
    };

    const localValue = value ? value : options[0];
    return (
      <div className={classNames(classes)}>
        {label}
        <div className={classNames(inputClasses)}>
          <ReactDropdown
            options={options}
            value={localValue}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default Dropdown;

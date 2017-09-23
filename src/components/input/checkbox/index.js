import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import './checkbox.scss';

const CheckBox = ({ checked, className, id, label, onChange }) => (
  <label className={classNames('CheckBox', className)} htmlFor={`form-check-input-${id}`}>
    <input
      id={`form-check-input-${id}`}
      className="CheckBox__Input"
      type="checkbox"
      checked={checked}
      disabled={false}
      onChange={onChange}
    />
    <i className={classNames('fa CheckBox__Tick', { 'fa-square-o': !checked, 'fa-check-square-o': checked })} />
    {label}
  </label>
);

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
};

CheckBox.defaultProps = {
  className: '',
};

export default CheckBox;

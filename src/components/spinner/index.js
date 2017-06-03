import PropTypes from 'prop-types';
import React from 'react';

const Spinner = ({ className, text }) => (
  <span className={className}>
    <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />{text}
  </span>
);

Spinner.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
};

Spinner.defaultProps = {
  className: '',
  text: '',
};

export default Spinner;

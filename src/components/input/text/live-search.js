import PropTypes from 'prop-types';
import React from 'react';

import classNames from 'classnames';

import Text from 'components/input/text';

import './search-bar.scss';

const LiveSearch = ({
  // Mandatory
  onChange,
  value,
  // Optional
  className,
  onKeyPress,
  placeholder,
}) => (
  <div className={classNames(className, 'SearchBar')}>
    <Text
      className="SearchBar__Input"
      onChange={onChange}
      onKeyPress={onKeyPress}
      placeholder={placeholder}
      value={value}
    />
    <i className="fa fa-search" />
  </div>
);

LiveSearch.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
};

LiveSearch.defaultProps = {
  className: '',
  onKeyPress: null,
  placeholder: '',
};

export default LiveSearch;

import PropTypes from 'prop-types';
import React from 'react';

import classNames from 'classnames';

import Text from 'components/input/text';

import './search-bar.scss';

const SearchBar = ({ className, onChange, onKeyPress, placeholder, value }) => (
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

SearchBar.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
};

SearchBar.defaultProps = {
  className: '',
  onKeyPress: null,
  placeholder: '',
};

export default SearchBar;

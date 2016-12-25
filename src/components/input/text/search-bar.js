import React, { PropTypes } from 'react';

import classNames from 'classnames';

import Text from 'components/input/text';

import './search-bar.scss';

const SearchBar = ({ className, onChange, placeholder, value }) => (
  <div className={classNames(className, 'SearchBar')}>
    <Text
      className="SearchBar__Input"
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
    <i className="fa fa-search" />
  </div>
);

SearchBar.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
};

SearchBar.defaultProps = {
  className: '',
  placeholder: '',
};

export default SearchBar;

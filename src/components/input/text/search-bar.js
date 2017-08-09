import PropTypes from 'prop-types';
import React from 'react';

import classNames from 'classnames';

import Text from 'components/input/text';

import './search-bar.scss';

const SearchBar = ({
  // Mandatory
  onChange,
  value,
  // Optional
  className,
  onKeyPress,
  placeholder,
}) => (
  <div>
    <div className={classNames(className, 'SearchBar')}>
      <Text
        className="SearchBar__Input"
        onChange={onChange}
        onKeyPress={onKeyPress}
        placeholder={placeholder}
        value={value}
      />
      <i className={classNames('fa', { 'fa-search': !value, 'fa-level-down fa-rotate-90': value })} />
    </div>
    {value &&
      <div className="text-muted SearchBar__Help">
        <small>Press enter to search</small>
      </div>
    }
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

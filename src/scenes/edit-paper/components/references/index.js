import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import TextList from 'components/input/textlist';

const ReferencesList = ({ className, onChange, placeholder, value }) => (
  <TextList
    className={className}
    onChange={onChange}
    placeholder={placeholder}
    value={value}
  />
);

ReferencesList.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: ImmutablePropTypes.list.isRequired,
};

ReferencesList.defaultProps = {
  className: '',
  placeholder: '',
};

export default ReferencesList;

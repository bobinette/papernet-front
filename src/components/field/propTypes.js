import PropTypes from 'prop-types';

export const ValueKeyPropType = PropTypes.arrayOf(PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]));

// Recursive prop type definition
const lazyFunction = f => () => f.apply(this, arguments);
export const FormPropType = PropTypes.shape({
  type: PropTypes.string.isRequired,
  valueKey: ValueKeyPropType,
  children: PropTypes.arrayOf(lazyFunction(() => FormPropType)),
  extra: PropTypes.any,
});

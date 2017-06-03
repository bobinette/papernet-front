import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Text from 'components/input/text';

import { ValueKeyPropType } from 'components/field/propTypes';

class TextField extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: ImmutablePropTypes.map.isRequired,
    valueKey: ValueKeyPropType.isRequired,
    extra: PropTypes.shape({
      className: PropTypes.string,
      placeholder: PropTypes.string,
    }),
  };

  static defaultProps = {
    extra: {
      className: '',
      placeholder: '',
    },
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(newValue) {
    const { value, valueKey } = this.props;
    this.props.onChange(value.setIn(valueKey, newValue));
  }

  render() {
    const { extra, value, valueKey } = this.props;

    return (
      <Text
        className={extra.className}
        placeholder={extra.placeholder}
        onChange={this.onChange}
        value={value.getIn(valueKey)}
      />
    );
  }
}

export default TextField;

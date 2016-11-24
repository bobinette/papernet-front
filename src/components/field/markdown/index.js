import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import TextArea from 'components/input/textarea';

import { ValueKeyPropType } from 'components/field/propTypes';

class MarkdownForm extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: ImmutablePropTypes.map.isRequired,
    valueKey: ValueKeyPropType.isRequired,
    extra: PropTypes.shape({
      autoresize: PropTypes.bool,
      className: PropTypes.string,
      placeholder: PropTypes.string,
    }),
  };

  static defaultProps = {
    extra: {
      autoresize: false,
      className: '',
      placeholder: '',
    },
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(newValue) {
    this.props.onChange(this.props.valueKey, newValue);
  }

  render() {
    const { extra, value, valueKey } = this.props;

    return (
      <TextArea
        autoresize={extra.autoresize}
        className={extra.className}
        onChange={this.onChange}
        placeholder={extra.placeholder}
        value={value.getIn(valueKey)}
      />
    );
  }
}

export default MarkdownForm;

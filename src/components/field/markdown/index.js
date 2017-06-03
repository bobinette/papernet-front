import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Markdown from 'components/input/markdown';

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
    const { value, valueKey } = this.props;
    this.props.onChange(value.setIn(valueKey, newValue));
  }

  render() {
    const { extra, value, valueKey } = this.props;

    return (
      <Markdown
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

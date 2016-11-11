import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { FormPropType } from 'components/field/propTypes';
import MarkdownForm from 'components/field/markdown';
import TextForm from 'components/field/text';

class FormField extends Component {
  static propTypes = {
    form: FormPropType.isRequired,
    onChange: PropTypes.func.isRequired,
    value: ImmutablePropTypes.map.isRequired,
  };

  render() {
    const { form, onChange, value } = this.props;

    switch (form.type) {
      case 'list':
        return (
          <div>
            {form.children.map((child, key) => (
              <FormField
                key={key}
                form={child}
                onChange={onChange}
                value={value}
              />
            ))}
          </div>
        );
      case 'markdown':
        return (
          <MarkdownForm
            extra={form.extra}
            onChange={onChange}
            value={value}
            valueKey={form.valueKey}
          />
        );
      case 'text':
        return (
          <TextForm
            extra={form.extra}
            onChange={onChange}
            value={value}
            valueKey={form.valueKey}
          />
        );
      default:
    }

    console.error(`Invalid form type: "${form.type}" for key "${form.valueKey}"`); // eslint-disable-line no-console
    return null;
  }
}

export default FormField;

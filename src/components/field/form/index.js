import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import classNames from 'classnames';

import { FormPropType } from 'components/field/propTypes';

import MarkdownForm from 'components/field/markdown';
import TextForm from 'components/field/text';
import TextListForm from 'components/field/textlist';

import './form.scss';

const LabelledField = ({ component, form }) => {
  if (!form.extra.label) return component;

  return (
    <div className="form-group row">
      <div className="col-md-2 FormLabel">{form.extra.label}</div>
      <div className="col-md-10">{component}</div>
    </div>
  );
};

LabelledField.propTypes = {
  component: PropTypes.element.isRequired,
  form: FormPropType.isRequired,
};

const FormField = ({ form, onChange, value }) => {
  let component;
  switch (form.type) {
    case 'button':
      return (
        <button
          className={classNames('btn btn-primary', form.extra.className)}
          onClick={form.extra.onClick}
        >
          {form.extra.label}
        </button>
      );
    case 'list':
      component = (
        <div className={form.extra.className ? form.extra.className : ''}>
          {form.children.map(child => (
            <FormField
              key={child.valueKey.join('.')}
              form={child}
              onChange={onChange}
              value={value}
            />
          ))}
        </div>
      );
      break;
    case 'markdown':
      component = (
        <MarkdownForm
          extra={form.extra}
          onChange={onChange}
          value={value}
          valueKey={form.valueKey}
        />
      );
      break;
    case 'text':
      component = (
        <TextForm
          extra={form.extra}
          onChange={onChange}
          value={value}
          valueKey={form.valueKey}
        />
      );
      break;
    case 'textlist':
      component = (
        <TextListForm
          extra={form.extra}
          onChange={onChange}
          value={value}
          valueKey={form.valueKey}
        />
      );
      break;
    default:
      console.error(`Invalid form type: "${form.type}" for key "${form.valueKey}"`); // eslint-disable-line no-console
      return null;
  }

  return (
    <LabelledField
      component={component}
      form={form}
    />
  );
};


FormField.propTypes = {
  form: FormPropType.isRequired,
  onChange: PropTypes.func.isRequired,
  value: ImmutablePropTypes.map.isRequired,
};

export default FormField;

import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import FormField from 'components/field/form';

import './view.scss';

const form = {
  type: 'list',
  valueKey: [],
  children: [
    {
      type: 'text',
      valueKey: ['title'],
      extra: {
        className: { PaperEditView__Title: true },
        placeholder: 'Title...',
      },
    },
    {
      type: 'markdown',
      valueKey: ['summary'],
      extra: {
        className: { PaperEditView__Summary: true },
        placeholder: 'Summary, in markdown format',
      },
    },
  ],
};

const PaperEditView = ({ onChange, onSave, paper }) => (
  <div className="PaperEditView">
    <div className="PaperEditView__ButtonGroup">
      <button className="PaperEditView__SaveButton" onClick={onSave}>
        <i className="mdi mdi-check" />Save
      </button>
    </div>
    <FormField
      form={form}
      onChange={onChange}
      value={paper}
    />
  </div>
);

PaperEditView.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  paper: ImmutablePropTypes.shape({
    title: ImmutablePropTypes.string,
  }).isRequired,
};

export default PaperEditView;

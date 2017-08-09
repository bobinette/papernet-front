import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Link } from 'react-router';

import FormField from 'components/field/form';
import NavBar, { NAVBAR_HOME } from 'components/navbar';
import TagList from 'components/input/taglist';

import './view.scss';

const form = {
  type: 'list',
  valueKey: [],
  extra: { className: 'col-md-10 offset-md-1' },
  children: [
    {
      type: 'text',
      valueKey: ['title'],
      extra: {
        className: 'PaperEdit__Title h3',
        placeholder: 'Title...',
      },
    },
    {
      type: 'markdown',
      valueKey: ['summary'],
      extra: {
        autoresize: true,
        className: 'PaperEdit__Summary',
        placeholder: 'Summary, in markdown format',
      },
    },
    {
      type: 'textlist',
      valueKey: ['references'],
      extra: {
        className: 'PaperEdit__References',
        placeholder: 'References...',
      },
    },
    {
      type: 'textlist',
      valueKey: ['authors'],
      extra: {
        className: 'PaperEdit__Authors',
        placeholder: 'Authors...',
      },
    },
  ],
};

class PaperEdit extends Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    paper: ImmutablePropTypes.shape({
      title: ImmutablePropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.onTagsChange = ::this.onTagsChange;
  }

  onTagsChange(tags) {
    const { onChange, paper } = this.props;
    onChange(paper.set('tags', tags));
  }

  render() {
    const { paper, onChange, onSave } = this.props;
    const tags = paper.get('tags') || List();

    const cancelUrl = paper.get('id') ? `/papers/${paper.get('id')}` : '/papers';

    return (
      <div className="PaperEdit container">
        <NavBar activeTab={NAVBAR_HOME}>
          <Link className="nav-link btn btn-link" to={cancelUrl}>Cancel</Link>
          <button className="btn btn-inverse-primary" onClick={onSave}>Save</button>
        </NavBar>
        <div className="PaperEdit__Content row">
          <TagList
            className="col-md-10 offset-md-1"
            onChange={this.onTagsChange}
            placeholder="Add tag..."
            value={tags}
          />
          <FormField
            form={form}
            onChange={onChange}
            value={paper}
          />
        </div>
      </div>
    );
  }
}

export default PaperEdit;

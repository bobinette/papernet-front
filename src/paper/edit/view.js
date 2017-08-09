import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Link } from 'react-router';

import SplitDropdown from 'components/dropdown/split';
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
    this.handleKey = ::this.handleKey;
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKey, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey, false);
  }

  onTagsChange(tags) {
    const { onChange, paper } = this.props;
    onChange(paper.set('tags', tags));
  }

  handleKey(event) {
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 83) { // 83 = s
      event.preventDefault();
      const { onSave } = this.props;
      const leave = event.shiftKey;
      onSave(leave);
      return false;
    }
    return true;
  }

  render() {
    const { paper, onChange, onSave } = this.props;
    const tags = paper.get('tags') || List();

    const cancelUrl = paper.get('id') ? `/papers/${paper.get('id')}` : '/papers';

    return (
      <div className="PaperEdit container">
        <NavBar activeTab={NAVBAR_HOME}>
          <SplitDropdown
            btnStyle="inverse-primary"
            onClick={() => onSave(true)}
            menu={[
              <button key="save-and-stay" className="btn dropdown-item" onClick={() => onSave(false)}>
                Save (stay)
              </button>,
              <div key="dropdown-divider-1" className="dropdown-divider" />,
              <Link key="cancel" className="btn dropdown-item" to={cancelUrl}>Cancel</Link>,
            ]}
            title="Save"
          />
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

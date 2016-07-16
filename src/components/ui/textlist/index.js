import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';

import classNames from 'classnames';

import { List } from 'immutable';

import TagList from '../tag/list';
import Text from '../text';

import './textlist.scss';

class TextList extends Component {
  static propTypes = {
    className: PropTypes.object,
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    style: PropTypes.oneOf(['tags', 'vertical']),
    type: PropTypes.oneOf(['number', 'string']),
    values: PropTypes.object
  }

  static defaultProps = {
    className: {},
    label: '',
    placeholder: '',
    style: 'tags',
    type: 'string',
    values: List()
  }

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onTextChange = this.onTextChange.bind(this);

    this.state = {
      currentText: ''
    };
  }

  onKeyPress(e) {
    if (e.key == 'Enter') {
      const { type, values } = this.props;
      const { currentText } = this.state;

      let v = currentText;
      switch (type) {
      case 'number': v = Number(currentText);
      }
      this.onChange(values.push(v));
      this.setState({ currentText: '' });
    }
  }

  onChange(values) {
    const { onChange } = this.props;
    onChange(values);
  }

  onClear(value) {
    const { values, onChange } = this.props;
    const index = values.toSeq().findKey(v => v === value.get('value'));
    if (index === -1) return;

    onChange(values.remove(index));
  }

  onTextChange(value) {
    this.setState({ currentText: value });
  }

  renderTagList(style, values) {
    if (style !== 'tags') return null;

    return (
      <TagList
        tags={values.toSeq().map(v => Map({ value: v, label: v }))}
        onClear={this.onClear}
      />
    );
  }

  render() {
    const { className, label, placeholder, style, values } = this.props;

    className.TextList = true;

    const labelClasses = {
      TextList__Label: !!label
    };

    const inputClasses = {
      TextList__Input: !!label,
      'TextList__Input--full': !label
    };

    const { currentText } = this.state;

    return (
      <div className={classNames(className)}>
        <div className={classNames(labelClasses)}>
          {label}
        </div>
        <div className={classNames(inputClasses)}>
          <Text
            onChange={this.onTextChange}
            onKeyPress={this.onKeyPress}
            value={currentText}
            placeholder={placeholder}
          />
          {this.renderTagList(style, values)}
        </div>
      </div>
    );
  }
}

export default TextList;

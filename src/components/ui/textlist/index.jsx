import React, { Component, PropTypes } from 'react';

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
    values: PropTypes.object
  }

  static defaultProps = {
    className: {},
    label: '',
    placeholder: '',
    style: 'tags',
    values: List()
  }

  constructor(props) {
    super(props);

    this.onKeyPress = this.onKeyPress.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      currentText: ''
    };
  }

  onKeyPress(e) {
    if (e.key == 'Enter') {
      const { values } = this.props;
      const { currentText } = this.state;
      this.onChange(values.push(currentText));
      this.setState({ currentText: '' });
    }
  }

  onChange(values) {
    const { onChange } = this.props;
    onChange(values);
  }

  onTextChange(value) {
    this.setState({ currentText: value });
  }

  renderTagList(style, values) {
    if (style !== 'tags') return null;

    return <TagList tags={values} onChange={this.onChange}/>;
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

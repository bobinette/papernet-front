import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Text from 'components/input/text';

class TagList extends Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: ImmutablePropTypes.list.isRequired,
  };

  static defaultProps = {
    className: '',
    placeholder: '',
  };

  constructor(props) {
    super(props);

    this.onDeleteTag = ::this.onDeleteTag;
    this.onKeyPress = ::this.onKeyPress;
    this.onTextChange = ::this.onTextChange;

    this.state = { text: '' };
  }

  onTextChange(text) {
    this.setState({ text });
  }

  onDeleteTag(index) {
    const { onChange, value } = this.props;
    onChange(value.delete(index));
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      const { onChange, value } = this.props;
      const { text } = this.state;

      onChange(value.push(text));
      this.setState({ text: '' });
    }
  }

  render() {
    const { className, placeholder, value } = this.props;
    const { text } = this.state;

    return (
      <div className={`TagList ${className}`}>
        <Text
          onChange={this.onTextChange}
          onKeyPress={this.onKeyPress}
          placeholder={placeholder}
          type="text"
          value={text}
        />
        <div className="TagList__Tags">
          {value.map((tag, i) => (
            <div className="TagList__Tag" key={i}>
              <div>{tag}</div>
              <button
                className="mdi mdi-close"
                onClick={() => { this.onDeleteTag(i); }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TagList;

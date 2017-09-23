import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Text from 'components/input/text';

import './textlist.scss';

class TextList extends Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: ImmutablePropTypes.list.isRequired,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    placeholder: '',
  };

  constructor(props) {
    super(props);

    this.onDelete = ::this.onDelete;
    this.onKeyPress = ::this.onKeyPress;
    this.onTextChange = ::this.onTextChange;

    this.state = {
      suggestions: [],
      text: '',
    };
  }

  onTextChange(text) {
    this.setState({ text });
  }

  onDelete(index) {
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
      <div className={`TextList ${className}`}>
        <Text
          placeholder={placeholder}
          value={text}
          onChange={this.onTextChange}
          onKeyPress={this.onKeyPress}
        />
        <ul className="TextList__Elements">
          {value.map((elt, i) => (
            <li className="TextList__Element" key={elt}>
              <span>{elt}</span>
              <button
                className="fa fa-times"
                onClick={() => { this.onDelete(i); }}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TextList;

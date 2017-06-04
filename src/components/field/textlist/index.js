import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Text from 'components/input/text';

import { ValueKeyPropType } from 'components/field/propTypes';

import './textlist.scss';

class TextList extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: ImmutablePropTypes.map.isRequired,
    valueKey: ValueKeyPropType.isRequired,
    extra: PropTypes.shape({
      className: PropTypes.string,
      placeholder: PropTypes.string,
    }),
  };

  static defaultProps = {
    extra: {
      className: '',
      placeholder: '',
    },
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
    const { onChange, value, valueKey } = this.props;
    onChange(value.setIn(valueKey, value.getIn(valueKey).delete(index)));
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      const { onChange, value, valueKey } = this.props;
      const { text } = this.state;

      const values = value.getIn(valueKey) || List();
      onChange(value.setIn(valueKey, values.push(text)));
      this.setState({ text: '' });
    }
  }

  render() {
    const { extra, value, valueKey } = this.props;
    const { text } = this.state;

    const { className, placeholder } = extra;

    const values = value.getIn(valueKey) || List();

    return (
      <div className={`TextList ${className}`}>
        <Text
          placeholder={placeholder}
          value={text}
          onChange={this.onTextChange}
          onKeyPress={this.onKeyPress}
        />
        <ul className="TextList__Elements">
          {values.map((elt, i) => (
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

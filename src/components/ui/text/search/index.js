import React, { Component, PropTypes } from 'react';

import classNames from 'classnames';

import Text from '..';
import './search.scss';

class Search extends Component {

  static propTypes = {
    className: PropTypes.object,
    onSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

    this.state = {
      focus: false,
      text: ''
    };
  }

  onChange(text) {
    this.setState({ text });
  }

  onClear() {
    const { onSearch } = this.props;

    this.setState({ text: '' });
    onSearch('');
  }

  onFocus(focus) {
    this.setState({ focus });
  }

  onKeyPress(e) {
    const { onSearch } = this.props;
    const { text } = this.state;

    if (e.key == 'Enter') {
      onSearch(text);
    }
  }

  render() {
    const { placeholder } = this.props;
    const { focus, text } = this.state;

    const classes = {
      Search: true,
      'Search--focus': focus
    };

    return (
      <div className={classNames(classes)}>
        <div className='mdi mdi-magnify Search__Magnify' />
        <Text
          onChange={this.onChange}
          onFocus={this.onFocus}
          onKeyPress={this.onKeyPress}
          placeholder={placeholder}
          value={text}
        />
        <div className='mdi mdi-close Search__Clear' onClick={this.onClear}/>
      </div>
    );
  }
}

export default Search;

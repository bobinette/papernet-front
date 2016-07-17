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

    this.state = {
      focus: false,
      text: ''
    };
  }

  onChange(text) {
    const { onSearch } = this.props;

    this.setState({ text });
    onSearch(text);
  }

  onClear() {
    const { onSearch } = this.props;

    this.setState({ text: '' });
    onSearch('');
  }

  onFocus(focus) {
    this.setState({ focus });
  }

  renderClear(text) {
    if (!text) return null;

    return <div className='mdi mdi-close Search__Clear' onClick={this.onClear}/>;
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
          placeholder={placeholder}
          value={text}
        />
        {this.renderClear(text)}
      </div>
    );
  }
}

export default Search;

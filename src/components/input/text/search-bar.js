import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Text from '.';

import './search-bar.scss';

class SearchBar extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    placeholder: '',
    value: '',
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

    this.state = { value: props.value };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  onChange(value) {
    this.setState({ value });
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onSearch(this.state.value);
    }
  }

  render() {
    const { className, placeholder } = this.props;
    const { value } = this.state;

    return (
      <div className={className}>
        <div className="SearchBar">
          <Text
            className="SearchBar__Input"
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            placeholder={placeholder}
            value={value}
          />
          <i className={classNames('fa', { 'fa-search': !value, 'fa-level-down fa-rotate-90': value })} />
        </div>
        <div
          className={classNames('text-muted SearchBar__Help', {
            'SearchBar__Help--show': value,
          })}
        >
          <small>Press enter to search</small>
        </div>
      </div>
    );
  }
}

export default SearchBar;

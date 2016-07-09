import React, { Component, PropTypes } from 'react';
import { fromJS } from 'immutable';

import classNames from 'classnames';

import qs from 'qs';
import 'whatwg-fetch';

import listensToClickOutside from 'react-onclickoutside';

import Tag from 'components/ui/tag';
import Text from 'components/ui/text';

import './select.scss';

class Select extends Component {

  // values expected to be object like
  // {
  //    value: ? <- an identifier
  //    label: ? <- the label that will be displayed
  // }
  static propTypes = {
    label: PropTypes.string,
    mapper: PropTypes.func,
    multiple: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    onUnselect: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    searchURL: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ])
  }

  static defaultProps = {
    label: '',
    mapper: x => x,
    multiple: false,
    placeholder: '',
    value: {}
  }

  constructor(props) {
    super(props);

    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onUnselect = this.onUnselect.bind(this);
    this.search = this.search.bind(this);

    this.state = {
      isOpen: false,
      options: [],
      text: ''
    };
  }

  handleClickOutside = () => {
    const { isOpen } = this.state;
    if (isOpen) {
      this.setState({ isOpen: false, text: '' });
    }
  };

  onFocus(focus) {
    if (!focus) return;
    this.setState({ isOpen: true });
  }

  onSelect(option) {
    const { onSelect } = this.props;
    onSelect(option);
    this.handleClickOutside();
  }

  onUnselect(option) {
    const { onUnselect } = this.props;
    onUnselect(option);
  }

  search(text) {
    const { searchURL } = this.props;

    const url = searchURL + '?' + qs.stringify({ q: text });
    fetch(url).then(
      (response) => response.json()
    ).then(
      (response) => {
        this.setState({ options: fromJS(response.data) });
      },
      (error) => {console.log(error);}
    );

    const isOpen = text.length > 0;
    this.setState({ isOpen, text });
  }

  renderChoices() {
    const { mapper } = this.props;
    const { isOpen, options } = this.state;

    const l = options.length;
    if (!isOpen || l === 0) return null;

    return (
      <div className='Select__Choices'>
        {
          options.map((option, i) => {
            const onClick = this.onSelect.bind(this, option);
            const classes = {
              Select__Choice: true,
              'Select__Choice--last': i === (l - 1)
            };
            const mapped = mapper(option);
            return (
              <div key={mapped.get('value')} onClick={onClick} className={classNames(classes)}>
                {mapped.get('label')}
              </div>
            );
          })
        }
      </div>
    );
  }

  renderInput(full) {
    const { placeholder } = this.props;
    const { text } = this.state;
    const inputClasses = {
      Select__Input: !full,
      'Select__Input--full': full
    };
    return (
      <div className={classNames(inputClasses)}>
        <div className='Select__InputSelect'>
          <Text
            onChange={this.search}
            onFocus={this.onFocus}
            placeholder={placeholder}
            value={text}
          />
          {this.renderChoices()}
        </div>
        {this.renderValues()}
      </div>
    );
  }

  renderValues() {
    const { value, mapper } = this.props;

    if (value.length === 0 || Object.keys(value).length === 0) {
      return null;
    }

    let localValue = value;
    if (!Array.isArray(localValue)) {
      localValue = [localValue];
    }

    return (
      <div className='Select_Values'>
        {
          value.map((v) => {
            const mapped = mapper(v);
            const onClear = this.onUnselect.bind(this, v);
            return (
              <div className='Select_Value' key={mapped.get('value')}>
                <Tag onClear={onClear} text={mapped.get('label')} />
              </div>
            );
          })
        }
      </div>
    );
  }

  renderLabel() {
    const { label } = this.props;

    if (!label) return null;

    return (
      <div className='Select__Label'>
        {label}
      </div>
    );
  }

  render() {
    const label = this.renderLabel();
    return (
      <div className='Select'>
        {label}
        {this.renderInput(!label)}
      </div>
    );
  }
}

export default listensToClickOutside(Select);

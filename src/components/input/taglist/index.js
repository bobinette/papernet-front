import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { toastr } from 'react-redux-toastr';

import Autosuggest from 'react-autosuggest';

import 'whatwg-fetch';
import PropTypes from 'prop-types';
import qs from 'qs';
import handleJSON from 'utils/actions/handleResponse';
import { papernetURL } from 'utils/constants';

import './taglist.scss';

const renderSuggestion = suggestion => suggestion;
const getSuggestionValue = suggestion => suggestion;

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

    this.onSuggestionsFetchRequested = ::this.onSuggestionsFetchRequested;
    this.onSuggestionsClearRequested = ::this.onSuggestionsClearRequested;
    this.onSuggestionSelected = ::this.onSuggestionSelected;

    this.state = {
      suggestions: [],
      text: '',
    };
  }

  onTextChange(_, { newValue }) {
    this.setState({ text: newValue });
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

  onSuggestionsFetchRequested({ value }) {
    const url = `${papernetURL}/tags?${qs.stringify({ q: value }, { skipNulls: true })}`;
    return fetch(url, {}).then(handleJSON).then(
      (response) => {
        const tags = response.data;
        this.setState({ suggestions: tags });
      },
      (err) => {
        toastr.error('', `Could not retrieve tags: ${err.message ? err.message : null}`);
      },
    );
  }

  onSuggestionsClearRequested() {
    this.setState({ suggestions: [] });
  }

  onSuggestionSelected(_, { suggestion }) {
    this.setState({ text: suggestion });
  }

  render() {
    const { className, placeholder, value } = this.props;
    const { suggestions, text } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder,
      value: text,
      onChange: this.onTextChange,
      onKeyPress: this.onKeyPress,
    };

    return (
      <div className={`TagList ${className}`}>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          onSuggestionSelected={this.onSuggestionSelected}
        />
        <div className="TagList__Tags">
          {value.map((tag, i) => (
            <div className="TagList__Tag" key={tag}>
              <div>{tag}</div>
              <button
                className="fa fa-times"
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

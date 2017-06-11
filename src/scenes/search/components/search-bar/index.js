import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Input from 'components/input/text/search-bar';

import { SEARCH_GO, SEARCH_UPDATE_Q } from '../../api/constants';

const mapDispatchToProps = dispatch => ({
  onChange: q => dispatch({ type: SEARCH_UPDATE_Q, q }),
  onSearch: q => dispatch({ type: SEARCH_GO, q, limit: 0, offset: 0, sources: null }),
});

const mapStateToProps = state => ({
  q: state.search.get('q'),
});

class SearchBar extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    q: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.onKeyPress = ::this.onKeyPress;
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onSearch(this.props.q);
    }
  }

  render() {
    const { q, onChange } = this.props;
    return (
      <div>
        <Input
          onChange={onChange}
          onKeyPress={this.onKeyPress}
          placeholder="Search..."
          value={q}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LiveSearch from 'components/input/text/live-search';

import { PAPER_LIST_UPDATE_FILTERS } from '../../api/constants';

import './search-bar.scss';

const mapDispatchToProps = dispatch => ({
  onChange: q => dispatch({ type: PAPER_LIST_UPDATE_FILTERS, key: 'q', value: q }),
});

const mapStateToProps = state => ({
  q: state.home.getIn(['filters', 'q']),
});

const SearchBar = ({ q, onChange }) => (
  <div className="container HomeScene__SearchBar">
    <div className="col-md-10 offset-md-1">
      <LiveSearch
        value={q}
        onChange={onChange}
        placeholder="Search by title, tags..."
      />
    </div>
  </div>
);

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  q: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

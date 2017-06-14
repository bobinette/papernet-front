import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import NavBar, { NAVBAR_SEARCH } from 'components/navbar';

import SearchBar from './components/search-bar';
import SearchList from './components/list';

import './scene.scss';

const mapStateToProps = state => ({
  results: state.search.get('results'),
});

const SearchScene = ({ results }) => (
  <div className="container">
    <NavBar activeTab={NAVBAR_SEARCH} />
    <div className="SearchScene col-md-10 offset-md-1">
      <SearchBar />
      {results.get('arxiv') &&
        <SearchList
          papers={results.getIn(['arxiv', 'papers'])}
          pagination={results.getIn(['arxiv', 'pagination'])}
          source={'arxiv'}
        />
      }
    </div>
  </div>
);

SearchScene.propTypes = {
  results: ImmutablePropTypes.map.isRequired,
};

export default connect(mapStateToProps)(SearchScene);

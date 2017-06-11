import React from 'react';

import NavBar, { NAVBAR_SEARCH } from 'components/navbar';

import SearchBar from './components/search-bar';

import './scene.scss';

const SearchScene = () => (
  <div>
    <NavBar activeTab={NAVBAR_SEARCH} />
    <div className="SearchScene">
      <SearchBar />
    </div>
  </div>
);

export default SearchScene;

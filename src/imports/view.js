import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';

import { paperPropType } from 'utils/constants';

import NavBar from 'components/navbar';
import SearchBar from 'components/input/text/search-bar';

import ImportCard from './row';

import './view.scss';

const ImportView = ({ imports, onChange, onImport, onSearch }) => (
  <div className="container">
    <NavBar
      items={[
        {
          element: <Link className="nav-link" to={'/papers'}>Home</Link>,
          active: false,
        },
        {
          element: <Link className="nav-link" to={'/imports'}>Imports</Link>,
          active: true,
        },
      ]}
    />
    <div className="ImportView__Content">
      <div className="ImportView__Search col-xs-8 offset-xs-2">
        <SearchBar
          onChange={onChange}
          placeholder="Search by title, author, category..."
          value={imports.get('q')}
        />
        <button
          className="btn btn-primary col-xs-2 offset-xs-5"
          onClick={onSearch}
        >
          Search
        </button>
      </div>
      <ul className="col-xs-12 container">
        {imports.get('list').map((paper, i) => (
          <li className="col-md-10 offset-md-1" key={i} >
            <ImportCard
              onImport={() => onImport(i)}
              paper={paper}
            />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

ImportView.propTypes = {
  imports: ImmutablePropTypes.contains({
    filters: ImmutablePropTypes.contains({
      q: PropTypes.string,
    }),
    list: ImmutablePropTypes.listOf(paperPropType).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onImport: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default ImportView;

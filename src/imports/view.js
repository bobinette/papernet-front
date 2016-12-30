import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';

import { paperPropType } from 'utils/constants';

import SearchBar from 'components/input/text/search-bar';
import NavBar from 'components/navbar';
import Pagination from 'components/pagination';
import Spinner from 'components/spinner';

import ImportCard from './row';

import './view.scss';

const ImportsList = ({ imports, onImport, onOffsetChange }) => (
  <div>
    <Pagination
      pagination={imports.get('pagination')}
      onChange={onOffsetChange}
    />
    <ul className="container">
      {imports.get('list').map((paper, i) => (
        <li className="col-md-12" key={i} >
          <ImportCard
            onImport={() => onImport(i)}
            paper={paper}
          />
        </li>
      ))}
    </ul>
    <Pagination
      pagination={imports.get('pagination')}
      onChange={onOffsetChange}
    />
  </div>
);

ImportsList.propTypes = {
  imports: ImmutablePropTypes.contains({
    list: ImmutablePropTypes.listOf(paperPropType).isRequired,
    pagination: ImmutablePropTypes.contains({
      limit: PropTypes.number,
      offset: PropTypes.number,
      total: PropTypes.number,
    }).isRequired,
  }).isRequired,
  onImport: PropTypes.func.isRequired,
  onOffsetChange: PropTypes.func.isRequired,
};

const ImportView = ({ imports, onChange, onImport, onOffsetChange, onSearch }) => (
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
      <div className="ImportView__Search col-md-8 offset-md-2">
        <SearchBar
          onChange={onChange}
          placeholder="Search by title, author, category..."
          value={imports.get('q')}
        />
        <button
          className="btn btn-primary ImportView__Search"
          onClick={onSearch}
        >
          Search
        </button>
      </div>
      <div className="col-md-10 offset-md-1">
        {
          imports.get('loading') ?
            <div className="ImportView__Spinner">
              <Spinner text="Fetching arXiv..." />
            </div>
            :
            <ImportsList imports={imports} onImport={onImport} onOffsetChange={onOffsetChange} />
        }
      </div>
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
  onOffsetChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default ImportView;

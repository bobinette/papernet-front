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

const arxivLimit = 50000;

const ArxivList = ({ arxiv, onImport, onOffsetChange }) => (
  <div>
    <Pagination
      pagination={arxiv.get('pagination')}
      onChange={onOffsetChange}
    />
    {
      arxiv.getIn(['pagination', 'offset']) >= arxivLimit ?
        <large>
          Unfortunately, the arXiv API cannot go further than 50.000 results by simply offsetting. You have to refine
          your search. However, refining your search is currently not possible in Papernet, but I&#39;ll be working on
          that soon!

          <br />
          More information <a href="https://groups.google.com/forum/#!msg/arxiv-api/DCfTl4jj7j0/WN6l6MG-tz4J">here</a>
        </large>
        :
        <ul className="container">
          {arxiv.get('list').map((paper, i) => (
            <li className="col-md-12" key={i} >
              <ImportCard
                onImport={() => onImport(i)}
                paper={paper}
              />
            </li>
          ))}
        </ul>
    }
    <Pagination
      pagination={arxiv.get('pagination')}
      onChange={onOffsetChange}
    />
  </div>
);

ArxivList.propTypes = {
  arxiv: ImmutablePropTypes.contains({
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

const ImportView = ({ arxiv, onChange, onImport, onOffsetChange, onSearch }) => (
  <div className="container">
    <NavBar
      items={[
        {
          element: <Link className="nav-link" to={'/papers'}>Home</Link>,
          active: false,
        },
        {
          element: <Link className="nav-link" to={'/arxiv'}>Arxiv</Link>,
          active: true,
        },
      ]}
    />
    <div className="ImportView__Content">
      <div className="ImportView__Search col-md-8 offset-md-2">
        <SearchBar
          onChange={onChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') onSearch();
          }}
          placeholder="Search by title, author, category..."
          value={arxiv.get('q')}
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
          arxiv.get('loading') ?
            <div className="ImportView__Spinner">
              <Spinner text="Fetching arXiv..." />
            </div>
            :
            <ArxivList arxiv={arxiv} onImport={onImport} onOffsetChange={onOffsetChange} />
        }
      </div>
    </div>
  </div>
);

ImportView.propTypes = {
  arxiv: ImmutablePropTypes.contains({
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

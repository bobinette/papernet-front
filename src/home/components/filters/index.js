import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { List, Map } from 'immutable';

import classNames from 'classnames';

import './filters.scss';

const f = (tag, filters, onFilterChange) => () => {
  const tags = filters.get('tags') || List();
  const i = tags.indexOf(tag);

  if (i === -1) {
    onFilterChange('tags', tags.push(tag));
  } else {
    onFilterChange('tags', tags.delete(i));
  }
};

const HomeFilters = ({ className, facets, filters, onFilterChange }) => (
  <div className={classNames(className, 'HomeFilters')}>
    <div className="HomeFilters__Filters form-check">
      <div className="HomeFilters__Section">
        <h5>Bookmarks</h5>
        <label className="form-check-label" htmlFor="bookmark-input">
          <input
            id="bookmark-input"
            className="form-check-input"
            type="checkbox"
            checked={filters.get('bookmarked')}
            onClick={(e) => { onFilterChange('bookmarked', e.target.checked); }}
          />
          Bookmarked
        </label>
      </div>

      <div className="HomeFilters__Section">
        <h5>Tags</h5>
        <ul className="HomeFilters__Tags">
          {facets.get('tags') && facets.get('tags').map((tag) => {
            const tags = filters.get('tags') || List();
            const i = tags.indexOf(tag.get('tag'));

            return (
              <li key={tag.get('tag')} className={classNames({ HomeFilters__Tags__Selected: i !== -1 })}>
                <button
                  className={classNames(
                    'btn btn-link HomeFilters__Tags__Tag',
                    { HomeFilters__Tags__Tag__Selected: i !== -1 },
                  )}
                  onClick={f(tag.get('tag'), filters, onFilterChange)}
                >
                  <div className="HomeFilters__Tags__TagText">{tag.get('tag')}</div>
                  <div><strong>{tag.get('count')}</strong></div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </div>
);

HomeFilters.propTypes = {
  className: PropTypes.string,
  facets: ImmutablePropTypes.map,
  filters: ImmutablePropTypes.contains({
    bookmarked: PropTypes.bool,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

HomeFilters.defaultProps = {
  className: '',
  facets: Map(),
};

export default HomeFilters;

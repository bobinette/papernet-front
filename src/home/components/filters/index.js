import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import classNames from 'classnames';

import Text from 'components/input/text';

import './filters.scss';

const Filters = ({ className, filters, onFilterChange }) => (
  <div className={classNames(className, 'Filters')}>
    <div className="Filters__Search">
      <Text
        className="Filters__Search__Input"
        onChange={(text) => { onFilterChange('q', text); }}
        placeholder="Search by title or tags..."
        value={filters.get('q')}
      />
      <i className="fa fa-search" />
    </div>
    <div className="Filters__Filters form-check">
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
  </div>
);

Filters.propTypes = {
  className: PropTypes.string,
  filters: ImmutablePropTypes.contains({
    bookmarked: PropTypes.bool,
    q: PropTypes.string,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

Filters.defaultProps = {
  className: '',
}

export default Filters;

import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import classNames from 'classnames';

import './pagination.scss';

const PaginationItem = ({ active, page, offset, onChange }) => (
  <li className={classNames('page-item', { active })}>
    <button
      className="page-link"
      onClick={() => { onChange(offset); }}
    >
      {page}
    </button>
  </li>
);

PaginationItem.propTypes = {
  active: PropTypes.bool,
  page: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

PaginationItem.defaultProps = {
  active: false,
};

const Pagination = ({ pagination, onChange }) => {
  if (pagination.get('total') === 0) {
    return null;
  }

  const limit = pagination.get('limit');
  const currentPage = Math.floor(pagination.get('offset') / limit) + 1;

  const lastPage = Math.ceil(pagination.get('total') / limit);
  let firstPage = currentPage;

  // Handle left part
  if (firstPage <= 3) {
    firstPage = 1;
  } else if (firstPage > 3) {
    firstPage -= 2;
  }

  // Handle right part
  if (lastPage > 4 && firstPage > lastPage - 4) {
    firstPage = lastPage - 4;
  }

  // Create pages
  const pages = [];
  for (let i = firstPage; i < firstPage + 5 && i <= lastPage; i += 1) {
    pages.push({ page: i, offset: (i - 1) * limit });
  }

  return (
    <div className="Pagination">
      <nav>
        <ul className="Pagination__Pages pagination">
          {
            pages[0].page !== 1 ? <PaginationItem page={1} offset={0} onChange={onChange} /> : null
          }
          {
            pages[0].page > 2 ?
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li> : null
          }
          {
            pages.map(page => (
              <PaginationItem
                key={page.page}
                active={page.page === currentPage}
                page={page.page}
                offset={page.offset}
                onChange={onChange}
              />
            ))
          }
          {
            pages[pages.length - 1].page < lastPage - 1 ?
              <li key={0} className="page-item disabled">
                <span className="page-link">...</span>
              </li> : null
          }
          {
            pages[pages.length - 1].page !== lastPage ?
              <PaginationItem
                page={lastPage}
                offset={(lastPage - 1) * limit}
                onChange={onChange}
              /> : null
          }
        </ul>
      </nav>
      <small>{pagination.get('total')} results / {limit} per page</small>
    </div>
  );
};

Pagination.propTypes = {
  pagination: ImmutablePropTypes.contains({
    limit: PropTypes.number,
    offset: PropTypes.number,
    total: PropTypes.number,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Pagination;

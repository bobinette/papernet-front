import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import classNames from 'classnames';

import Pagination from 'components/pagination';

import HomeListRow from './components/row';

import './list.scss';

const HomeList = ({ className, onBookmark, onOffsetChange, pagination, papers, user }) => (
  <div className={classNames('HomeList', className)}>
    <ul>
      {papers.map(paper => (
        <li key={paper.get('id')} >
          <HomeListRow
            onBookmark={onBookmark}
            paper={paper}
            user={user.get('user')}
          />
        </li>
      ))}
    </ul>
    <Pagination
      pagination={pagination}
      onChange={onOffsetChange}
    />
  </div>
);

HomeList.propTypes = {
  className: PropTypes.string,
  onBookmark: PropTypes.func.isRequired,
  onOffsetChange: PropTypes.func.isRequired,
  pagination: ImmutablePropTypes.map.isRequired,
  papers: ImmutablePropTypes.list.isRequired,
  user: ImmutablePropTypes.map.isRequired,
};

HomeList.defaultProps = {
  className: '',
};

export default HomeList;

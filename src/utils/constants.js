import { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

// PropTypes
export const paperPropType = ImmutablePropTypes.contains({
  id: PropTypes.number,
  title: ImmutablePropTypes.string,
  summary: ImmutablePropTypes.string,
});

export const userPropType = ImmutablePropTypes.contains({
  id: PropTypes.string,
  name: PropTypes.string,
  bookmarks: ImmutablePropTypes.listOf(PropTypes.number),
});

export const paginationPropType = ImmutablePropTypes.contains({
  limit: PropTypes.number,
  offset: PropTypes.number,
  total: PropTypes.number,
});

// URLs
export const papernetURL = `${process.env.PAPERNET_HOST}/api`;


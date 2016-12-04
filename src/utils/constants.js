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

// URLs
export const papernetURL = 'http://localhost:1705/api';


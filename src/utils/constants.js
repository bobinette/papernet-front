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
let apiURL = 'https://bobi.space/api';
if (
  window.location.hostname.indexOf('localhost') !== -1 ||
  window.location.hostname.indexOf('127.0.0.1') !== -1) {
  apiURL = 'http://127.0.0.1:1705/api';
} else if (window.location.hostname.indexOf('local-bobi') !== -1) {
  apiURL = 'http://local-bobi.space/api';
}
export const papernetURL = `${apiURL}`;


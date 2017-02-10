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
let baseHost = 'https://bobi.space';
if (
  window.location.hostname.indexOf('localhost') === 0 ||
  window.location.hostname.indexOf('127.0.0.1') === 0) {
  baseHost = 'http://127.0.0.1:1705';
} else if (window.location.hostname.indexOf('local-bobi') === 0) {
  baseHost = 'http://local-bobi.space';
}
export const papernetURL = `${baseHost}/api`;


import { toastr } from 'react-redux-toastr';

import 'whatwg-fetch';

import qs from 'qs';

import handleJSON from 'utils/actions/handleResponse';
import { papernetURL } from 'utils/constants';

import { RECEIVE_USER } from 'auth/constants';
import { RECEIVE_PAPER_LIST } from './constants';

export const getPaperList = () => (dispatch, getState) => {
  const search = getState().home.getIn(['filters', 'q']);
  const filters = getState().home.get('filters');
  const params = {
    q: search.length > 0 ? search : null,
    bookmarked: filters.get('bookmarked') ? true : null,
    tags: filters.get('tags').toJS() || null,
  };
  const url = `${papernetURL}/papers?${qs.stringify(params, { skipNulls: true, indices: false })}`;

  const token = getState().auth.getIn(['token', 'token']);
  if (!token) return null;

  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  return fetch(url, { headers }).then(handleJSON).then(
    (response) => {
      const papers = response.data;
      const facets = response.facets;
      const total = response.pagination.total;
      return dispatch({ type: RECEIVE_PAPER_LIST, papers, total, facets });
    },
    (err) => {
      toastr.error('', `Could not load your papers: ${err.message ? err.message : null}`);
    },
  );
};

export const bookmark = id => (dispatch, getState) => {
  const token = getState().auth.getIn(['token', 'token']);
  if (!token) return null;

  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const url = `${papernetURL}/auth/v2/bookmarks`;
  return fetch(url, { method: 'POST', headers, body: JSON.stringify({ paperID: id, bookmark: true }) })
  .then(handleJSON).then(
    (response) => {
      const user = response.data;
      return dispatch({ type: RECEIVE_USER, user });
    },
    (err) => {
      toastr.error('', `Could not bookmark: ${err.message ? err.message : null}`);
    },
  );
};

export const unbookmark = id => (dispatch, getState) => {
  const token = getState().auth.getIn(['token', 'token']);
  if (!token) return null;

  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const url = `${papernetURL}/auth/v2/bookmarks`;
  return fetch(url, { method: 'POST', headers, body: JSON.stringify({ paperID: id, bookmark: false }) })
  .then(handleJSON).then(
    (response) => {
      const user = response.data;
      return dispatch({ type: RECEIVE_USER, user });
    },
    (err) => {
      toastr.error('', `Could not unbookmark: ${err.message ? err.message : null}`);
    },
  );
};

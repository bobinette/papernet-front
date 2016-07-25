import qs from 'qs';
import 'whatwg-fetch';

import { error } from 'actions/notifications';

import { FILTER_PAPERS, RECEIVE_PAPERS, SEARCH_PAPERS } from 'constants/events';

const base_url = 'http://localhost:8081';

export const getPapers = () => (dispatch, getState) => {
  const { papers } = getState();

  const url = base_url + '/papers?' + qs.stringify(papers.get('filters').toJS(), { arrayFormat: 'brackets' });
  return fetch(url).then(
    (response) => {
      const json = response.json();
      if (response.ok) {
        return json;
      } else {
        return json.then(Promise.reject.bind(Promise));
      }
    }
  ).then(
    (response) => {
      const papers = response.data;
      return dispatch({ type: RECEIVE_PAPERS, papers});
    },
    (err) => {error('Error getting papers', err.message ? err.message : null);}
  );
};

export const search = (q) => {
  return {
    type: SEARCH_PAPERS,
    search: q
  };
};

export const filterPapers = (ids) => {
  return {
    type: FILTER_PAPERS,
    ids: ids
  };
};

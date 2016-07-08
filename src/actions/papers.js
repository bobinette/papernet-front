import qs from 'qs';
import 'whatwg-fetch';

import { RECEIVE_PAPERS, SEARCH_PAPERS } from '../constants/events';

const base_url = 'http://localhost:8081';

export const getPapers = () => (dispatch, getState) => {
  const { papers } = getState();

  const url = base_url + '/papers?' + qs.stringify(papers.get('filters').toJS());

  return fetch(url).then(
    (response) => response.json()
  ).then(
    (response) => {
      const papers = response.data;
      return dispatch({ type: RECEIVE_PAPERS, papers});
    },
    (error) => {console.log(error);}
  );
};

export const search = (q) => {
  return {
    type: SEARCH_PAPERS,
    search: q
  };
};

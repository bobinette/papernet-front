import 'whatwg-fetch';

import qs from 'qs';

import handleJSON from 'utils/actions/handleResponse';
import { papernetURL } from 'utils/constants';

import { RECEIVE_PAPER_LIST } from './constants';

export const getPaperList = () => (dispatch, getState) => {
  const search = getState().paperList.get('search');
  const params = {
    q: search.length > 0 ? search : null,
  };
  const url = `${papernetURL}/papers?${qs.stringify(params, { skipNulls: true })}`;
  return fetch(url, {}).then(handleJSON).then(
    (response) => {
      const papers = response.data;
      return dispatch({ type: RECEIVE_PAPER_LIST, papers });
    },
    (err) => {
      console.log('Could not get paper list', err.message ? err.message : null); // eslint-disable-line no-console
    }
  );
};

export default getPaperList;

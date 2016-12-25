import 'whatwg-fetch';

import qs from 'qs';

import handleJSON from 'utils/actions/handleResponse';
import { papernetURL } from 'utils/constants';

import { RECEIVE_IMPORTS } from './constants';

export const search = () => (dispatch, getState) => { // eslint-disable-line import/prefer-default-export
  const q = getState().imports.get('q');
  const params = {
    q: q && q.length > 0 ? q : null,
  };
  const url = `${papernetURL}/arxiv?${qs.stringify(params, { skipNulls: true })}`;

  const token = getState().user.get('token');
  if (!token) return null;

  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  return fetch(url, { headers }).then(handleJSON).then(
    (response) => {
      const papers = response.data;
      return dispatch({ type: RECEIVE_IMPORTS, list: papers });
    },
    (err) => {
      console.log('Could not get paper list', err.message ? err.message : null); // eslint-disable-line no-console
    }
  );
};

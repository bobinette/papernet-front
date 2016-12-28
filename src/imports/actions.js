import { toastr } from 'react-redux-toastr';

import 'whatwg-fetch';

import qs from 'qs';

import handleJSON from 'utils/actions/handleResponse';
import { papernetURL } from 'utils/constants';

import { savePaper } from 'paper/actions';

import { RECEIVE_IMPORTS, START_LOADING, STOP_LOADING } from './constants';

export const search = () => (dispatch, getState) => {
  const imports = getState().imports;
  const q = imports.get('q');
  const limit = imports.getIn(['pagination', 'limit']);
  const offset = imports.getIn(['pagination', 'offset']);
  const params = {
    limit,
    offset,
    q: q && q.length > 0 ? q : null,
  };
  const url = `${papernetURL}/arxiv?${qs.stringify(params, { skipNulls: true })}`;

  const token = getState().user.get('token');
  if (!token) return null;

  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  dispatch({ type: START_LOADING });
  return fetch(url, { headers }).then(handleJSON).then(
    (response) => {
      const papers = response.data;
      dispatch({ type: STOP_LOADING });
      return dispatch({ type: RECEIVE_IMPORTS, list: papers, total: response.pagination.total });
    },
    (err) => {
      dispatch({ type: STOP_LOADING });
      toastr.error('', `Could not search: ${err.message ? err.message : null}`);
    }
  );
};

export const importPaper = index => (dispatch, getState) => {
  const paper = getState().imports.getIn(['list', index]);
  if (!paper) return null;

  return dispatch(savePaper(paper)).then(
    (id) => {
      const list = getState().imports.get('list').setIn([index, 'id'], id);
      return dispatch({ type: RECEIVE_IMPORTS, list });
    }
  );
};

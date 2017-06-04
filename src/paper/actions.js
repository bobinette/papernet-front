import { toastr } from 'react-redux-toastr';

import fetch from 'utils/fetch';
import { papernetURL } from 'utils/constants';

import { FECTH_PAPER, NOT_FOUND_PAPER, RECEIVE_PAPER, UPDATE_PAPER } from './constants';

export const getPaper = id => (dispatch, getState) => {
  const token = getState().auth.getIn(['token', 'token']);
  if (!token) return null;

  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  dispatch({ type: FECTH_PAPER });
  return fetch(`${papernetURL}/papers/${id}`, { headers }).then(
    (response) => {
      const paper = response.data;
      return dispatch({ type: RECEIVE_PAPER, paper });
    },
    ({ json, status }) => {
      if (status === 404) {
        return dispatch({ type: NOT_FOUND_PAPER });
      }
      toastr.error('', `Could not get paper: ${json.message ? json.message : null}`);
      return null;
    },
  );
};

export const updatePaper = value => dispatch => (
  dispatch({ type: UPDATE_PAPER, value })
);

export const savePaper = paper => (dispatch, getState) => {
  let saveURL = `${papernetURL}/papers`;
  let method = 'POST';
  if (paper.get('id')) {
    saveURL += `/${paper.get('id')}`;
    method = 'PUT';
  }

  const token = getState().auth.getIn(['token', 'token']);
  if (!token) return null;

  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  return fetch(saveURL, {
    method,
    headers,
    body: JSON.stringify(paper.toJS()),
  }).then(
    (response) => {
      const respPaper = response.data;
      dispatch({ type: RECEIVE_PAPER, paper: respPaper });
      return respPaper.id;
    },
    ({ json }) => {
      toastr.error('', `Could not save paper: ${json.message ? json.message : null}`);
    },
  );
};

export const deletePaper = () => (dispatch, getState) => {
  const paper = getState().paper.get('paper');

  if (!paper.get('id')) return new Promise();

  const token = getState().auth.getIn(['token', 'token']);
  if (!token) return null;

  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const deleteURL = `${papernetURL}/papers/${paper.get('id')}`;
  return fetch(deleteURL, { method: 'DELETE', headers }).then(
    () => {
      dispatch({ type: RECEIVE_PAPER, paper: {} });
    },
    ({ json }) => {
      toastr.error('', `Could not delete paper: ${json.message ? json.message : null}`);
    },
  );
};

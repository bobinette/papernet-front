import 'whatwg-fetch';

import handleJSON from 'utils/actions/handleResponse';
import { papernetURL } from 'utils/constants';

import { RECEIVE_PAPER, UPDATE_PAPER } from './constants';

export const getPaper = id => dispatch => (
  fetch(`${papernetURL}/papers/${id}`, {}).then(handleJSON).then(
    (response) => {
      const paper = response.data;
      return dispatch({ type: RECEIVE_PAPER, paper });
    },
    (err) => {
      console.log('Could not get paper', err.message ? err.message : null); // eslint-disable-line no-console
    }
  )
);

export const updatePaper = (key, value) => dispatch => (
  dispatch({ type: UPDATE_PAPER, key, value })
);

export const savePaper = () => (dispatch, getState) => {
  const paper = getState().paper;

  let saveURL = `${papernetURL}/papers`;
  let method = 'POST';
  if (paper.get('id')) {
    saveURL += `/${paper.get('id')}`;
    method = 'PUT';
  }

  return fetch(saveURL, {
    method,
    body: JSON.stringify(paper.toJS()),
  }).then(handleJSON).then(
    (response) => {
      const respPaper = response.data;
      dispatch({ type: RECEIVE_PAPER, paper: respPaper });
      return respPaper.id;
    },
    (err) => {
      console.error('Could not save paper', err.message ? err.message : null); // eslint-disable-line no-console
    }
  );
};

export const deletePaper = () => (dispatch, getState) => {
  const paper = getState().paper;

  if (!paper.get('id')) return new Promise();

  const deleteURL = `${papernetURL}/papers/${paper.get('id')}`;
  return fetch(deleteURL, { method: 'DELETE' }).then(handleJSON).then(
    () => {
      dispatch({ type: RECEIVE_PAPER, paper: {} });
    },
    (err) => {
      console.error('Could not save paper', err.message ? err.message : null); // eslint-disable-line no-console
    }
  );
};

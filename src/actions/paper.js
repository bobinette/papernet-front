import history from 'routing';

import 'whatwg-fetch';

import { RECEIVE_PAPER, UPDATE_PAPER } from '../constants/events';

import { handleJSON } from 'actions/handleResponse';
import { success, error } from 'actions/notifications';

const url = 'http://localhost:8081';

export const getPaper = (id) => (dispatch) => {
  return fetch(url + '/papers/' + id, {}).then(handleJSON).then(
    (response) => {
      const paper = response.data;
      return dispatch({ type: RECEIVE_PAPER, paper });
    },
    (err) => {
      error('Could not get paper', err.message ? err.message : null);
    }
  );
};

export const updatePaper = (key, value) => {
  return {
    type: UPDATE_PAPER,
    key,
    value
  };
};

export const deletePaper = (id) => () => {
  return fetch(url + '/papers/' + id, {
    method: 'DELETE'
  }).then(
    () => { history.push('home'); },
    (err) => {
      error('Could not delete paper', err.message ? err.message : null);
    }
  );
};

export const savePaper = (paper) => (dispatch) => {
  let saveURL = url + '/papers';
  let method = 'POST';
  if (paper.get('id')) {
    saveURL += '/' + paper.get('id');
    method = 'PUT';
  }

  return fetch(saveURL, {
    method,
    body: JSON.stringify(paper)
  }).then(handleJSON).then(
    (response) => {
      const paper = response.data;
      dispatch({ type: RECEIVE_PAPER, paper });
      success('Saved!');
    },
    (err) => {
      error('Could not save paper', err.message ? err.message : null);
    }
  );
};

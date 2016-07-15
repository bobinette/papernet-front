import { hashHistory } from 'react-router';

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

export const createPaper = () => () => {
  return fetch(url + '/papers', {method: 'POST', body: {}}).then(handleJSON).then(
    (response) => {
      const paper = response.data;
      hashHistory.push('/papers/' + paper.id + '/edit');
    },
    (err) => {
      error('Could not create paper', err.message ? err.message : null);
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
    () => { hashHistory.push('/papers'); },
    (err) => {
      error('Could not delete paper', err.message ? err.message : null);
    }
  );
};

export const savePaper = (paper) => (dispatch) => {
  return fetch(url + '/papers/' + paper.get('id'), {
    method: 'PUT',
    body: JSON.stringify(paper)
  }).then(handleJSON).then(
    (response) => {
      const paper = response.data;
      dispatch({ type: RECEIVE_PAPER, paper });
      success('Saved');
      hashHistory.push('/papers/' + paper.id);
    },
    (err) => {
      error('Could not save paper', err.message ? err.message : null);
    }
  );
};

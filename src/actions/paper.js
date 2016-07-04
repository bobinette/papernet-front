import { hashHistory } from 'react-router';

import 'whatwg-fetch';

import { RECEIVE_PAPER, UPDATE_PAPER } from '../constants/events';

const url = 'http://localhost:8081';

export const getPaper = (id) => (dispatch) => {
  return fetch(url + '/papers/' + id, {}).then(
    (response) => response.json()
  ).then(
    (response) => {
      const paper = response.data;
      return dispatch({ type: RECEIVE_PAPER, paper });
    },
    (error) => {
      console.log(error);
    }
  );
};

export const createPaper = () => () => {
  return fetch(url + '/papers', {method: 'POST', body: {}}).then(
    (response) => response.json()
  ).then(
    (response) => {
      const paper = response.data;
      hashHistory.push('/papers/' + paper.id + '/edit');
    },
    (error) => {console.log(error);}
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
    () => {hashHistory.push('/papers');},
    (error) => {console.log(error);}
  );
};

export const savePaper = (paper) => (dispatch) => {
  return fetch(url + '/papers/' + paper.get('id'), {
    method: 'PUT',
    body: JSON.stringify(paper)
  }).then(
    (response) => response.json()
  ).then(
    (response) => {
      const paper = response.data;
      dispatch({ type: RECEIVE_PAPER, paper });
      hashHistory.push('/papers/' + paper.id);
    },
    (error) => {console.log(error);}
  );
};

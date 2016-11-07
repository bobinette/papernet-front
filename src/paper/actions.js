import 'whatwg-fetch';

import handleJSON from 'utils/actions/handleResponse';
import { PapernetURL } from 'utils/constants';

import { RECEIVE_PAPER } from './constants';

export const getPaper = id => dispatch => (
  fetch(`${PapernetURL}/papernet/papers/${id}`, {}).then(handleJSON).then(
    (response) => {
      const paper = response.data;
      return dispatch({ type: RECEIVE_PAPER, paper });
    },
    (err) => {
      console.log('Could not get paper', err.message ? err.message : null);
    }
  )
);

import 'whatwg-fetch';

import handleJSON from 'utils/actions/handleResponse';
import { papernetURL } from 'utils/constants';

import { RECEIVE_PAPER_LIST } from './constants';

export const getPaperList = () => dispatch => (
  fetch(`${papernetURL}/papers`, {}).then(handleJSON).then(
    (response) => {
      const paperList = response.data;
      return dispatch({ type: RECEIVE_PAPER_LIST, paperList });
    },
    (err) => {
      console.log('Could not get paper list', err.message ? err.message : null); // eslint-disable-line no-console
    }
  )
);
export default getPaperList;

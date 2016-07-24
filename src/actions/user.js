import { List } from 'immutable';

import 'whatwg-fetch';

import { RECEIVE_USER, UPDATE_USER } from 'constants/events';

import { handleJSON } from 'actions/handleResponse';
import { success, error } from 'actions/notifications';

const url = 'http://localhost:8081';

export const bookmark = (id) => (dispatch, getState) => {
  const user = getState().user;
  const bookmarks = user.get('bookmarks') || List();
  const index = bookmarks.toSeq().findKey(b => b === id);

  if (typeof index === 'undefined') {
    dispatch(saveUser(user.set('bookmarks', bookmarks.push(id))));
  } else {
    dispatch(saveUser(user.set('bookmarks', bookmarks.remove(index))));
  }
};

export const updateUser = (key, value) => {
  return {
    type: UPDATE_USER,
    key,
    value
  };
};

export const saveUser = (user) => (dispatch) => {
  let saveURL = url + '/users/' + user.get('name');

  return fetch(saveURL, {
    method: 'PUT',
    body: JSON.stringify(user)
  }).then(handleJSON).then(
    (response) => {
      const user = response.data;
      dispatch({ type: RECEIVE_USER, user });
      success('Saved!');
    },
    (err) => {
      error('Could not save: ', err.message ? err.message : null);
    }
  );
};

import cookie from 'react-cookie';

import 'whatwg-fetch';

import { handleJSON } from 'actions/handleResponse';
import { error } from 'actions/notifications';
import { RECEIVE_USER } from 'constants/events';

import history from 'routing';

const url = 'http://localhost:8080/api';

export const loadCookie = () => (dispatch) => {
  const username = cookie.load('username');
  if (!username) return null;

  return dispatch(logIn(username));
};

export const logIn = (name) => (dispatch) => {
  return fetch(url + '/users/' + name, {}).then(handleJSON).then(
    (response) => {
      const user = response.data;
      return user;
    }
  ).then(
    (user) => {
      dispatch({ type: RECEIVE_USER, user });
      cookie.save('username', name, { path: '/' });
    },
    (err) => {
      this.setState({ loginFailed: true });
      error('Could not connect: ' + (err.message ? err.message : 'Unknown error'));
    }
  );
};

export const signUp = (name) => (dispatch) => {
  const data = { name };
  return fetch(url + '/users', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(handleJSON).then(
    (resp) => {
      const user = resp.data;
      dispatch({
        type: RECEIVE_USER,
        user: user
      });
    },
    (err) => {
      error('Could not connect: ' + (err.message ? err.message : 'Unknown error'));
    }
  );
};

export const logout = () => (dispatch) => {
  cookie.remove('username');
  dispatch({
    type: RECEIVE_USER,
    user: {}
  });
  history.push('login');
};

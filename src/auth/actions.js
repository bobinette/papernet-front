import { toastr } from 'react-redux-toastr';
import cookie from 'react-cookie';

import 'whatwg-fetch';

import handleJSON from 'utils/actions/handleResponse';
import { papernetURL } from 'utils/constants';

import { USER_SIGN_OUT } from 'services/auth/constants';
import { RECEIVE_TOKEN, RECEIVE_USER } from './constants';

export const login = () => () => {
  const url = `${papernetURL}/login/google`;
  return fetch(url, {}).then(handleJSON).then(
    (response) => {
      window.location.href = response.url;
    },
    (err) => {
      toastr.error('', `Could not get auth urls: ${err.message ? err.message : null}`);
    },
  );
};

export const exchangeToken = (code, state) => (dispatch) => {
  const params = { code, state };
  const url = `${papernetURL}/login/google`;
  return fetch(url, { method: 'POST', body: JSON.stringify(params) }).then(handleJSON).then(
    (response) => {
      cookie.save('access_token', response.access_token, { path: '/' });
      dispatch({ type: RECEIVE_TOKEN, token: response.access_token });
      return dispatch({ type: RECEIVE_USER, token: response.user });
    },
    (err) => {
      toastr.error('', `Could not exchange token: ${err.message ? err.message : null}`);
    },
  );
};

export const loadCookie = () => () => {
  console.warn('auth.actions.loadCookie is deprecated');
};

export const me = () => (dispatch, getState) => {
  const token = getState().auth.getIn(['token', 'token']);
  if (!token) return null;

  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const url = `${papernetURL}/auth/v2/me`;
  return fetch(url, { headers }).then(handleJSON).then(
    user => dispatch({ type: RECEIVE_USER, user }),
    (err) => {
      toastr.error('', `Could not load your profile: ${err.message ? err.message : null}`);
    },
  );
};

export const logout = () => (dispatch) => {
  cookie.remove('access_token', { path: '/' });
  dispatch({ type: RECEIVE_TOKEN, token: '' });
  dispatch({ type: RECEIVE_USER, user: {} });

  // New service
  dispatch({ type: USER_SIGN_OUT });
};

import { toastr } from 'react-redux-toastr';
import cookie from 'react-cookie';

import 'whatwg-fetch';

import qs from 'qs';

import handleJSON from 'utils/actions/handleResponse';
import { papernetURL } from 'utils/constants';

import { RECEIVE_TOKEN, RECEIVE_USER } from './constants';

export const login = () => () => {
  const url = `${papernetURL}/auth`;
  return fetch(url, {}).then(handleJSON).then(
    (response) => {
      window.location.href = response.url;
    },
    (err) => {
      toastr.error('', `Could not get auth urls: ${err.message ? err.message : null}`);
    }
  );
};

export const exchangeToken = (provider, code, state) => (dispatch) => {
  const params = { code, state };
  const url = `${papernetURL}/auth/${provider}?${qs.stringify(params, { skipNulls: true })}`;
  return fetch(url, {}).then(handleJSON).then(
    (response) => {
      cookie.save('access_token', response.access_token, { path: '/' });
      dispatch({ type: RECEIVE_TOKEN, token: response.access_token });
      return dispatch({ type: RECEIVE_USER, token: response.user });
    },
    (err) => {
      toastr.error('', `Could not exchange token: ${err.message ? err.message : null}`);
    }
  );
};

export const loadCookie = () => (dispatch, getState) => {
  const token = cookie.load('access_token');
  if (!token || token === getState().user.get('token')) return null;

  return dispatch({ type: RECEIVE_TOKEN, token });
};

export const me = () => (dispatch, getState) => {
  const token = getState().user.get('token');
  if (!token) return null;

  const headers = new Headers({
    Authorization: `Bearer ${token}`,
  });

  const url = `${papernetURL}/me`;
  return fetch(url, { headers }).then(handleJSON).then(
    response => dispatch({ type: RECEIVE_USER, user: response.data }),
    (err) => {
      toastr.error('', `Could not load your profile: ${err.message ? err.message : null}`);
    }
  );
};

export const logout = () => (dispatch) => {
  cookie.remove('access_token', { path: '/' });
  dispatch({ type: RECEIVE_TOKEN, token: '' });
  dispatch({ type: RECEIVE_USER, user: {} });
};

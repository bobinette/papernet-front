import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { GOOGLE_LOGIN_URL_FETCH } from './api/constants';

import googleLogo from './logo.svg';
import './google.scss';

const mapDispatchToProps = dispatch => ({
  onLogin: () => dispatch({ type: GOOGLE_LOGIN_URL_FETCH }),
});

const GoogleLogin = ({ onLogin }) => (
  <div className="GoogleLogin container">
    <button
      className="GoogleLogin__Content btn btn-link offset-md-3 col-md-6"
      onClick={onLogin}
    >
      <img className="GoogleLogin__Logo" height="30" src={googleLogo} alt="google loge" />
      <span className="GoogleLogin__Text">Sign in with Google</span>
    </button>
  </div>
);

GoogleLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(GoogleLogin);

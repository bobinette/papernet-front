import React from 'react';

import googleLogo from './logo.svg';
import './google.scss';

const GoogleLogin = () => (
  <div className="GoogleLogin container">
    <button className="GoogleLogin__Content btn btn-link btn-lg offset-md-3 col-md-6">
      <img className="GoogleLogin__Logo" height="30" src={googleLogo} alt="google loge" />
      <span className="GoogleLogin__Text">Sign in with Google</span>
    </button>
  </div>
);

export default GoogleLogin;

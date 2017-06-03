import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import GoogleLogin from './components/google';
import EmailLogin from './components/email';

import './view.scss';

const LoginView = ({ providers }) => {
  const hasGoogle = providers.contains('google');
  const hasEmail = providers.contains('email');

  return (
    <div className="LoginView">
      {hasGoogle && <GoogleLogin />}
      {hasGoogle && hasEmail && <LoginView.Separator />}
      {hasEmail && <EmailLogin />}
    </div>
  );
};

LoginView.propTypes = {
  providers: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
};

LoginView.Separator = () => (
  <div className="container">
    <div className="LoginView__Or offset-md-2 col-md-8">
      <span className="LoginView__Separator" />
      <span className="LoginView__Or__Text">Or</span>
      <span className="LoginView__Separator" />
    </div>
  </div>
);

export default LoginView;

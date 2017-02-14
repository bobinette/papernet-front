import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { login } from 'auth/actions';

import googleSignIn from 'google-sign-in.png';

import './nouser.scss';

const mapDispatchToProps = dispatch => ({
  onLogin: () => dispatch(login()),
});

const NoUserView = ({ className, onLogin }) => (
  <div className={className}>
    <h3>Welcome to Papernet!</h3>
    <p>To be able to use this platform you need to login via Google. Do not worry, your informations
    are safe! The only thing Papernet needs is your name.</p>

    <input className="NoUserView__SignIn" type="image" src={googleSignIn} onClick={onLogin} />
  </div>
);

NoUserView.propTypes = {
  className: PropTypes.string,
  onLogin: PropTypes.func.isRequired,
};

NoUserView.defaultProps = {
  className: '',
};

export default connect(null, mapDispatchToProps)(NoUserView);

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';

const NoUserState = ({ className }) => (
  <div className={className}>
    <h3>Welcome to Papernet!</h3>
    <p>To be able to use this platform you need to sign in. Do not worry, your informations
    are safe! Nothing is done with your data</p>

    <Link to="login" className="btn btn-primary">Sign in</Link>
  </div>
);

NoUserState.propTypes = {
  className: PropTypes.string,
};

NoUserState.defaultProps = {
  className: '',
};

export default NoUserState;

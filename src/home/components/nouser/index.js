import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router';

import './nouser.scss';

const NoUserView = ({ className }) => (
  <div className={className}>
    <h3>Welcome to Papernet!</h3>
    <p>To be able to use this platform you need to sign in. Do not worry, your informations
    are safe! Nothing is done with your data</p>

    <Link to="login" className="btn btn-primary">Sign in</Link>
  </div>
);

NoUserView.propTypes = {
  className: PropTypes.string,
};

NoUserView.defaultProps = {
  className: '',
};

export default NoUserView;

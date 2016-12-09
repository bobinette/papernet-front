import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router';

import { exchangeToken } from './actions';

import './google.scss';

class GoogleLogIn extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.shape({
      query: PropTypes.shape({
        code: PropTypes.string,
        state: PropTypes.string,
      }),
    }).isRequired,
  };

  constructor(props) {
    super(props);

    const { dispatch, location } = this.props;
    dispatch(exchangeToken('google', location.query.code, location.query.state));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, location } = nextProps;
    dispatch(exchangeToken('google', location.query.code, location.query.state));
  }

  render() {
    return (
      <div className="GoogleAuthContainer container">
        <nav className="navbar navbar-fixed-top navbar-light bg-faded">
          <Link className="navbar-brand" to={'/papers'}>Papernet</Link>
        </nav>
        <div className="GoogleAuthContainer__Content jumbotron">
          <h1 className="display-3">Congratulations!</h1>
          <p className="lead">
            You are now connected to Papernet with Google! Do not worry, Google was used just
            to avoid implementing an authentication system. Ain&#39;t nobody got time for that.
            I will not be doing anything with your data.
          </p>
          <p className="lead">
            <Link className="btn btn-primary btn-lg" to={'/papers'} role="button">
              Let&#39;s head back home
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default connect()(GoogleLogIn);

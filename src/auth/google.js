import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
    const { code, error, state } = location.query;
    if (!error) {
      dispatch(exchangeToken(code, state));
    }
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, location } = nextProps;
    const { code, error, state } = location.query;
    if (!error) {
      dispatch(exchangeToken(code, state));
    }
  }

  render() {
    const { location } = this.props;

    if (location.query.error) {
      return (
        <div className="GoogleAuthContainer container">
          <nav className="navbar navbar-fixed-top navbar-light bg-faded">
            <Link className="navbar-brand" to={'/papers'}>Papernet</Link>
          </nav>
          <div className="GoogleAuthContainer__Content jumbotron">
            <h1 className="display-3">Failure</h1>
            <p className="lead">
              It seems you did not grant Papernet access to your Google information. You can click the button below
              to go back to the home page if you want to retry. To verify the apps you have authorized and refused
              click <a href="https://myaccount.google.com/u/permissions" target="_blank" rel="noopener noreferrer">
              here</a>
            </p>
            <p className="lead">
              <Link className="btn btn-primary btn-lg" to={'/papers'} role="button">
                Let&#39;s head back home
              </Link>
            </p>
            <p>
              Error: {location.query.error}
            </p>
          </div>
        </div>
      );
    }

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

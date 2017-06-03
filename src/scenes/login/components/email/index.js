import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import InputText from 'components/input/text';

import { EMAIL_LOGIN_SIGN_IN, EMAIL_LOGIN_SIGN_UP } from './api/constants';

import './email.scss';

class EmailLogin extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.onEmailChange = ::this.onEmailChange;
    this.onPasswordChange = ::this.onPasswordChange;
    this.onSignIn = ::this.onSignIn;
    this.onSignUp = ::this.onSignUp;

    this.state = {
      email: '',
      password: '',
    };
  }

  onEmailChange(email) {
    this.setState({ email });
  }

  onSignIn() {
    const { email, password } = this.state;
    this.props.dispatch({ type: EMAIL_LOGIN_SIGN_IN, email, password });
  }

  onPasswordChange(password) {
    this.setState({ password });
  }

  onSignUp() {
    const { email, password } = this.state;
    this.props.dispatch({ type: EMAIL_LOGIN_SIGN_UP, email, password });
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="container">
        <div className="EmailLogin offset-md-3 col-md-6">
          <h5>Login</h5>
          <InputText
            // className={}
            placeholder={'email'}
            onChange={this.onEmailChange}
            value={email}
          />
          <InputText
            // className={}
            placeholder={'password'}
            onChange={this.onPasswordChange}
            password
            value={password}
          />
          <div className="EmailLogin__Buttons">
            <button
              className="btn btn-primary"
              onClick={this.onSignIn}
            >
              Sign in
            </button>
            <button
              className="btn btn-secondary"
              onClick={this.onSignUp}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(EmailLogin);

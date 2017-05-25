import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';

import InputText from 'components/input/text';

import './email.scss';

class EmailLogin extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.onEmailChange = ::this.onEmailChange;
    this.onPasswordChange = ::this.onPasswordChange;
    this.onLogin = ::this.onLogin;
    this.onSignUp = ::this.onSignUp;

    this.state = {
      email: '',
      password: '',
    };
  }

  onEmailChange(email) {
    this.setState({ email });
  }

  onLogin() {
    console.log(this.state);
  }

  onPasswordChange(password) {
    this.setState({ password });
  }

  onSignUp() {
    console.log(this.state);
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
              onClick={this.onLogin}
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

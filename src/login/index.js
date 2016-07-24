import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { loadCookie, logIn, signUp } from './actions';

import Button from 'components/ui/button';
import Text from 'components/ui/text';

import './login.scss';

const mapStateToProps = (state) => ({
  user: state.user
});

class UserLogin extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    user: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onLogIn = this.onLogIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);

    this.state = {
      username: ''
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadCookie());
  }

  onChange(username) {
    this.setState({ username });
  }

  onKeyPress(evt) {
    if (evt.key == 'Enter') {
      this.onLogIn();
    }
  }

  onLogIn() {
    const { dispatch } = this.props;
    const { username } = this.state;

    dispatch(logIn(username));
  }

  onSignUp() {
    const { dispatch } = this.props;
    const { username } = this.state;

    dispatch(signUp(username));
  }

  renderHeader() {
    return (
      <div className='Login__Header'>
        <h1 className='Login__Title'>Papernet</h1>
      </div>
    );
  }

  render() {
    const { username } = this.state;

    const buttonClasses = {
      Login_Button: true
    };

    return (
      <div className='Login'>
        {this.renderHeader()}
        <div className='Login__Login'>
          <div className='Login__Input'>
            <Text
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
              placeholder='Username...'
              value={username}
            />
          </div>
          <div className='Login__ButtonContainer'>
          <Button
            classes={buttonClasses}
            content='Login'
            onClick={this.onLogIn}
          />
          <Button
            classes={buttonClasses}
            content='SignUp'
            onClick={this.onSignUp}
          />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(UserLogin);

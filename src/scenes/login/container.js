import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import NavBar from 'components/navbar';

import { PROVIDERS_FETCH } from './api/constants';

import LoginView from './view';

const mapStateToProps = state => ({
  providers: state.login.get('providers'),
});

class LoginContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    providers: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
  };

  constructor(props) {
    super(props);

    this.props.dispatch({ type: PROVIDERS_FETCH });
  }

  render() {
    const { providers } = this.props;

    return (
      <div className="LoginContainer">
        <NavBar />
        <div className="LoginContainer container">
          <div className="col-md-10 offset-md-1">
            <LoginView
              providers={providers}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(LoginContainer);

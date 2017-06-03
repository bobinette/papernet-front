import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { TOKEN_COOKIE_LOAD } from 'services/auth/constants';

class App extends PureComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    props.dispatch({ type: TOKEN_COOKIE_LOAD });
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
}


export default connect()(App);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { getPapers } from 'actions/papers';
import { loadCookie } from 'login/actions';

import Home from '.';

import './home.scss';

const mapStateToProps = (state) => ({
  filters: state.papers.get('filters'),
  papers: state.papers.get('list'),
  user: state.user
});

class HomeContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    filters: PropTypes.object,
    papers: PropTypes.object,
    user: PropTypes.object
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadCookie());
    dispatch(getPapers());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, filters } = this.props;

    if (filters !== nextProps.filters) {
      dispatch(getPapers());
    }
  }

  render() {
    const { papers, user } = this.props;

    return (
      <div className='HomeContainer'>
        <Home
          papers={papers || List()}
          user={user}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomeContainer);

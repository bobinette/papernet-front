import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { filterPapers, getPapers } from 'actions/papers';
import { loadCookie } from 'login/actions';

import ReadingList from '.';

const mapStateToProps = (state) => ({
  filters: state.papers.get('filters'),
  papers: state.papers.get('list'),
  user: state.user
});

class ReadingListContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    filters: PropTypes.object,
    papers: PropTypes.object,
    user: PropTypes.object
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadCookie()).then(
      () => {
        const { user } = this.props; // Load user
        dispatch(filterPapers(user.get('bookmarks')));
      }
    ).then(
      () => dispatch(getPapers())
    );
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, filters, user } = this.props;

    if (user !== nextProps.user) {
      dispatch(filterPapers(user.get('bookmarks')));
    }

    if (filters !== nextProps.filters) {
      dispatch(getPapers());
    }
  }

  render() {
    const { papers, user } = this.props;

    return (
      <div className='ReadingListContainer'>
        <ReadingList
          papers={papers || List()}
          user={user}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ReadingListContainer);

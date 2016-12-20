import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { loadCookie, me } from 'auth/actions';

import { bookmark, getPaperList, unbookmark } from './actions';
import { SEARCH_PAPER_LIST } from './constants';
import HomeView from './view';

const mapStateToProps = state => ({
  papers: state.home.get('papers'),
  search: state.home.get('search'),
  user: state.user,
});

class HomeContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    papers: ImmutablePropTypes.list.isRequired,
    search: PropTypes.string.isRequired,
    user: ImmutablePropTypes.map.isRequired,
  };

  constructor(props) {
    super(props);

    this.onBookmark = ::this.onBookmark;
    this.onSearch = ::this.onSearch;

    this.props.dispatch(loadCookie());
    this.props.dispatch(me());
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getPaperList());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.search !== this.props.search) {
      dispatch(getPaperList());
    }

    if (nextProps.user.get('token') !== this.props.user.get('token')) {
      dispatch(me());
    }
  }

  onSearch(search) {
    this.props.dispatch({ type: SEARCH_PAPER_LIST, search });
  }

  onBookmark(id) {
    const { dispatch, user } = this.props;
    const bookmarks = user.getIn(['user', 'bookmarks']) || List();
    if (bookmarks.includes(id)) {
      dispatch(unbookmark(id));
    } else {
      dispatch(bookmark(id));
    }
  }

  render() {
    const { papers, search, user } = this.props;

    return (
      <div className="HomeContainer">
        <HomeView
          papers={papers}
          onBookmark={this.onBookmark}
          onSearch={this.onSearch}
          search={search}
          user={user}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomeContainer);

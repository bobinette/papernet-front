import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { loadCookie, me } from 'auth/actions';

import { bookmark, getPaperList, unbookmark } from './actions';
import { UPDATE_FILTERS } from './constants';
import HomeView from './view';

const mapStateToProps = state => ({
  filters: state.home.get('filters'),
  papers: state.home.get('papers'),
  search: state.home.get('search'),
  user: state.user,
});

class HomeContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    filters: ImmutablePropTypes.contains({
      bookmarked: PropTypes.bool,
    }).isRequired,
    papers: ImmutablePropTypes.list.isRequired,
    search: PropTypes.string.isRequired,
    user: ImmutablePropTypes.map.isRequired,
  };

  constructor(props) {
    super(props);

    this.onBookmark = ::this.onBookmark;
    this.onFilterChange = ::this.onFilterChange;

    this.props.dispatch(loadCookie());
    this.props.dispatch(me());
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getPaperList());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.search !== this.props.search || nextProps.filters !== this.props.filters) {
      dispatch(getPaperList());
    }

    if (nextProps.user.get('token') !== this.props.user.get('token')) {
      dispatch(me());
    }
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

  onFilterChange(key, value) {
    this.props.dispatch({ type: UPDATE_FILTERS, key, value });
  }

  render() {
    const { filters, papers, user } = this.props;

    return (
      <div className="HomeContainer">
        <HomeView
          filters={filters}
          papers={papers}
          onBookmark={this.onBookmark}
          onFilterChange={this.onFilterChange}
          user={user}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomeContainer);

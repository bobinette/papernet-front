import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { loadCookie, me } from 'auth/actions';

import { paginationPropType } from 'utils/constants';

import NavBar from 'components/navbar';

import { bookmark, getPaperList, unbookmark } from './actions';
import { UPDATE_FILTERS, UPDATE_HOME_OFFSET } from './constants';
import HomeView from './view';

const mapStateToProps = state => ({
  filters: state.home.get('filters'),
  pagination: state.home.get('pagination'),
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
    pagination: paginationPropType.isRequired,
    papers: ImmutablePropTypes.list.isRequired,
    search: PropTypes.string.isRequired,
    user: ImmutablePropTypes.map.isRequired,
  };

  constructor(props) {
    super(props);

    this.onBookmark = ::this.onBookmark;
    this.onFilterChange = ::this.onFilterChange;
    this.onOffsetChange = ::this.onOffsetChange;

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

  onOffsetChange(offset) {
    this.props.dispatch({ type: UPDATE_HOME_OFFSET, offset });
  }

  render() {
    const { filters, pagination, papers, user } = this.props;

    return (
      <div className="HomeContainer">
        <NavBar
          items={[
            { element: <Link className="nav-link" to={'/papers'}>Home</Link>, active: true },
            { element: <Link className="nav-link" to={'/arxiv'}>Arxiv</Link>, active: false },
          ]}
          rightItems={[
            { element: <Link className="btn btn-outline-primary" to={'/papers/new'}>New</Link> },
          ]}
        />
        <HomeView
          filters={filters}
          pagination={pagination}
          papers={papers}
          onBookmark={this.onBookmark}
          onFilterChange={this.onFilterChange}
          onOffsetChange={this.onOffsetChange}
          user={user}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomeContainer);

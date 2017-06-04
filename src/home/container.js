import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { paginationPropType } from 'utils/constants';

import NavBar, { NAVBAR_HOME } from 'components/navbar';

import { bookmark, getPaperList, unbookmark } from './actions';
import { UPDATE_FILTERS, UPDATE_HOME_OFFSET } from './constants';
import HomeView from './view';

const mapStateToProps = state => ({
  facets: state.home.get('facets'),
  filters: state.home.get('filters'),
  pagination: state.home.get('pagination'),
  papers: state.home.get('papers'),
  search: state.home.get('search'),
  user: state.auth,
});

class HomeContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    facets: ImmutablePropTypes.map.isRequired,
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
    const { facets, filters, pagination, papers, user } = this.props;

    return (
      <div className="HomeContainer">
        <NavBar activeTab={NAVBAR_HOME}>
          <Link className="btn btn-inverse-primary" to={'/papers/new'}>New</Link>
        </NavBar>
        <HomeView
          facets={facets}
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

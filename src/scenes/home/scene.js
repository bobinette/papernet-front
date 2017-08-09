import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import NavBar, { NAVBAR_HOME } from 'components/navbar';

import { USER_BOOKMARK } from 'services/auth/constants';

import { PAPER_LIST_FETCH, PAPER_LIST_UPDATE_FILTERS, PAPER_LIST_UPDATE_PAGINATION } from './api/constants';

import HomeList from './components/list';
import HomeFilters from './components/filters';
import NoUserState from './components/no-user';
import HomeEmptyState from './components/empty-state';
import SearchBar from './components/search-bar';

import './scene.scss';

const mapDispatchToProps = dispatch => ({
  fetchPapers: () => dispatch({ type: PAPER_LIST_FETCH }),
  onBookmark: (paperId, bookmark) => dispatch({ type: USER_BOOKMARK, paperId, bookmark }),
  onFilterChange: (key, value) => dispatch({ type: PAPER_LIST_UPDATE_FILTERS, key, value }),
  onOffsetChange: offset => dispatch({ type: PAPER_LIST_UPDATE_PAGINATION, key: 'offset', value: offset }),
});

const mapStateToProps = state => ({
  facets: state.home.get('facets'),
  filters: state.home.get('filters'),
  pagination: state.home.get('pagination'),
  papers: state.home.get('papers'),
  user: state.auth,
});

class HomeScene extends PureComponent {
  static propTypes = {
    facets: ImmutablePropTypes.map.isRequired,
    filters: ImmutablePropTypes.map.isRequired,
    fetchPapers: PropTypes.func.isRequired,
    onBookmark: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onOffsetChange: PropTypes.func.isRequired,
    pagination: ImmutablePropTypes.map.isRequired,
    papers: ImmutablePropTypes.list.isRequired,
    user: ImmutablePropTypes.map.isRequired,
  };

  constructor(props) {
    super(props);

    this.props.fetchPapers();
  }

  renderScene() {
    const { facets, filters, onBookmark, onFilterChange, onOffsetChange, pagination, papers, user } = this.props;

    if (!user.getIn(['token', 'token'])) {
      return <NoUserState />;
    }

    if (
      user.getIn(['user', 'id'])
      && (
        !user.getIn(['user', 'canSee'])
        || user.getIn(['user', 'canSee']).size === 0
      )
    ) {
      return <HomeEmptyState />;
    }

    return (
      <div>
        <SearchBar />
        <div className="HomeView__Content row">
          <HomeFilters
            className="col-md-3"
            facets={facets}
            filters={filters}
            onFilterChange={onFilterChange}
          />
          <HomeList
            className="col-md-9"
            pagination={pagination}
            papers={papers}
            onBookmark={onBookmark}
            onOffsetChange={onOffsetChange}
            user={user}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <NavBar activeTab={NAVBAR_HOME} />
        <div className="HomeScene container">
          {this.renderScene()}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScene);

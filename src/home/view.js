import React, { PropTypes, PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import classNames from 'classnames';

import { paginationPropType, paperPropType, userPropType } from 'utils/constants';

import Pagination from 'components/pagination';

import SearchBar from 'components/input/text/search-bar';

import HomeFilters from './components/filters';
import NoUserView from './components/nouser';
import PaperListViewRow from './components/row';

import './view.scss';

const HomeList = ({ className, onBookmark, onOffsetChange, pagination, papers, user }) => (
  <div className={classNames(className, 'container')}>
    <ul className="HomeList col-md-12">
      {papers.map((paper, i) => (
        <li className="col-md-12" key={i} >
          <PaperListViewRow paper={paper} user={user.get('user')} onBookmark={onBookmark} />
        </li>
      ))}
    </ul>
    <Pagination
      className="col-md-12"
      pagination={pagination}
      onChange={onOffsetChange}
    />
  </div>
);

HomeList.propTypes = {
  className: PropTypes.string,
  onBookmark: PropTypes.func.isRequired,
  onOffsetChange: PropTypes.func.isRequired,
  papers: paperPropType.isRequired,
  pagination: paginationPropType.isRequired,
  user: userPropType.isRequired,
};

HomeList.defaultProps = {
  className: '',
};

class HomeView extends PureComponent {
  static propTypes = {
    facets: ImmutablePropTypes.map,
    filters: ImmutablePropTypes.contains({
      bookmarked: PropTypes.bool,
    }).isRequired,
    onBookmark: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onOffsetChange: PropTypes.func.isRequired,
    pagination: paginationPropType.isRequired,
    papers: ImmutablePropTypes.listOf(paperPropType).isRequired,
    user: ImmutablePropTypes.contains({
      token: PropTypes.string,
      user: userPropType,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.onSearch = ::this.onSearch;
    this.onSearchChange = ::this.onSearchChange;

    this.state = { search: props.filters.get('q') };
  }

  onSearchChange(search) {
    this.setState({ search });
  }

  onSearch(e) {
    if (e.key === 'Enter') {
      const { onFilterChange } = this.props;
      const { search } = this.state;

      onFilterChange('q', search);
    }
  }

  render() {
    const { facets, filters, onBookmark, onFilterChange, onOffsetChange, pagination, papers, user } = this.props;
    const { search } = this.state;

    if (!user.get('token')) {
      return (
        <div className="HomeView container">
          <NoUserView className="col-md-8 offset-md-2" />
        </div>);
    }

    return (
      <div className="HomeView container">
        <div className="HomeView__Search row">
          <SearchBar
            className="col-xs-8 offset-xs-2"
            onChange={this.onSearchChange}
            onKeyPress={this.onSearch}
            placeholder="Search by title or tags..."
            value={search}
          />
        </div>
        <div className="HomeView__Content row">
          <div className="HomeView__Filters col-md-3 container">
            <HomeFilters
              facets={facets}
              filters={filters}
              onFilterChange={onFilterChange}
            />
          </div>
          <HomeList
            className="HomeView__List col-md-9"
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
}

export default HomeView;

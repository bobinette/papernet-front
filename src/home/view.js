import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
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
      {papers.map(paper => (
        <li className="col-md-12" key={paper.get('title')} >
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
  papers: ImmutablePropTypes.listOf(paperPropType).isRequired,
  pagination: paginationPropType.isRequired,
  user: userPropType.isRequired,
};

HomeList.defaultProps = {
  className: '',
};

const HomeEmptyState = () => (
  <div className="HomeView container">
    <div className="col-md-8 offset-md-2">
      <h3>Time to create your first paper!</h3>
      <p>It looks like your list is empty. To add papers to your list in Papernet, you have two options:</p>
      <ul>
        <li>
          you can directly create a new paper from the <strong>New</strong> button in the navigation bar, or
        </li>
        <li>
          you can head to the <strong>Arxiv</strong> tab, still in the navigation bar,
          and import papers from there.
        </li>
      </ul>
      <p>
      Happy papering!
      </p>
    </div>
  </div>
);

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
      token: ImmutablePropTypes.contains({
        token: PropTypes.string,
      }),
      user: userPropType,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.onSearchChange = ::this.onSearchChange;

    this.state = { search: props.filters.get('q') };
  }

  onSearchChange(search) {
    const { onFilterChange } = this.props;
    onFilterChange('q', search);

    this.setState({ search });
  }

  render() {
    const { facets, filters, onBookmark, onFilterChange, onOffsetChange, pagination, papers, user } = this.props;
    const { search } = this.state;

    // If the token is not loaded, do not display anything to avoid glitches
    // If the token is loaded and there actually was a token but there is no user id
    // it means we are waiting for the 'me' API to respond, so same: do no display anything to avoid glitches
    if (
      !user.getIn(['token', 'loaded'])
      || (user.getIn(['token', 'token']) && user.getIn(['user', 'id']) === '')
    ) {
      return null;
    }

    if (!user.getIn(['token', 'token'])) {
      return (
        <div className="HomeView container">
          <NoUserView className="col-md-8 offset-md-2" />
        </div>);
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
      <div className="HomeView container">
        <div className="HomeView__Search row">
          <SearchBar
            className="col-md-8 offset-md-2"
            onChange={this.onSearchChange}
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

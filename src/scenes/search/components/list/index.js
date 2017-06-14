import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Pagination from 'components/pagination';

import SearchListRow from './components/row';

import './list.scss';

const arxivLimit = 50000;

const paperPropType = ImmutablePropTypes.contains({
  id: PropTypes.number,

  reference: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,

  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  authors: ImmutablePropTypes.listOf(PropTypes.string),
  tags: ImmutablePropTypes.listOf(PropTypes.string),
  references: ImmutablePropTypes.listOf(PropTypes.string),
});

class SearchList extends PureComponent {

  static propTypes = {
    papers: ImmutablePropTypes.listOf(paperPropType).isRequired,
    pagination: ImmutablePropTypes.contains({
      limit: PropTypes.number,
      offset: PropTypes.number,
      total: PropTypes.number,
    }).isRequired,
    source: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.onOffsetChange = ::this.onOffsetChange;
  }

  onOffsetChange(offset) {
    const { source } = this.props;
    console.log(offset, source);
  }

  render() {
    const { pagination, papers } = this.props;

    if (!pagination || !papers) return null;

    return (
      <div className="SearchList">
        <Pagination
          pagination={pagination}
          onChange={this.onOffsetChange}
        />
        {
          pagination.get('offset') >= arxivLimit ?
            <large>
              Unfortunately, the arXiv API cannot go further than 50.000 results by simply offsetting.
              You have to refine your search. However, refining your search is currently not possible in Papernet,
              but I&#39;ll be working on that soon!
              <br />
              More information
              <a href="https://groups.google.com/forum/#!msg/arxiv-api/DCfTl4jj7j0/WN6l6MG-tz4J">here</a>
            </large>
            :
            <ul className="container row">
              {papers.map(paper => (
                <li key={paper.get('title')} >
                  <SearchListRow paper={paper} />
                </li>
              ))}
            </ul>
        }
        <Pagination
          pagination={pagination}
          onChange={this.onOffsetChange}
        />
      </div>
    );
  }
}

export default SearchList;

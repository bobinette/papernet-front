import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { browserHistory } from 'react-router';

import { importPaper, search } from './actions';
import { SEARCH_ARXIV, UPDATE_ARXIV_OFFSET } from './constants';
import ArxivView from './view';

const mapStateToProps = state => ({
  arxiv: state.arxiv,
  user: state.auth,
});

class ImportContainer extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    arxiv: ImmutablePropTypes.contains({
      filters: ImmutablePropTypes.contains({
        title: PropTypes.string,
        q: PropTypes.string,
      }),
    }).isRequired,
    location: PropTypes.shape({
      query: PropTypes.shape({
        q: PropTypes.string,
        offset: PropTypes.string,
      }),
    }),
  };

  static defaultProps = {
    location: {
      query: {
        q: '',
        offset: '0',
      },
    },
  };

  constructor(props) {
    super(props);

    this.onChange = ::this.onChange;
    this.onImport = ::this.onImport;
    this.onOffsetChange = ::this.onOffsetChange;
    this.onSearch = ::this.onSearch;

    this.state = { search: this.props.location.query.q || '' };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({ type: SEARCH_ARXIV, value: this.state.search });

    const offset = parseInt(this.props.location.query.offset, 10);
    dispatch({ type: UPDATE_ARXIV_OFFSET, offset: isNaN(offset) ? 0 : offset });
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.location !== this.props.location) {
      const offset = parseInt(nextProps.location.query.offset, 10);
      dispatch({ type: SEARCH_ARXIV, value: nextProps.location.query.q });
      dispatch({ type: UPDATE_ARXIV_OFFSET, offset: isNaN(offset) ? 0 : offset });
    }

    if (
      nextProps.arxiv.get('filters') !== this.props.arxiv.get('filters') ||
      nextProps.arxiv.getIn(['pagination', 'offset']) !== this.props.arxiv.getIn(['pagination', 'offset'])
    ) {
      dispatch(search());
    }
  }

  onChange(value) {
    this.setState({ search: value });
  }

  onImport(paper) {
    this.props.dispatch(importPaper(paper));
  }

  onOffsetChange(offset) {
    const location = Object.assign({}, this.props.location);

    if (offset) {
      Object.assign(location.query, { offset });
    } else {
      delete location.query.offset;
    }

    browserHistory.push(location);
  }

  onSearch() {
    const location = Object.assign({}, this.props.location);

    if (this.state.search) {
      Object.assign(location.query, { q: this.state.search });
    } else {
      delete location.query.q;
    }

    browserHistory.push(location);
  }

  render() {
    const { arxiv } = this.props;

    return (
      <div className="ImportContainer">
        <ArxivView
          arxiv={arxiv}
          onChange={this.onChange}
          onImport={this.onImport}
          onOffsetChange={this.onOffsetChange}
          onSearch={this.onSearch}
          search={this.state.search}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ImportContainer);

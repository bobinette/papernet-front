import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { loadCookie, me } from 'auth/actions';

import { importPaper, search } from './actions';
import { SEARCH_ARXIV, UPDATE_ARXIV_OFFSET } from './constants';
import ImportView from './view';

const mapStateToProps = state => ({
  arxiv: state.arxiv,
  user: state.user,
});

class ImportContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    arxiv: ImmutablePropTypes.contains({
      filters: ImmutablePropTypes.contains({
        title: PropTypes.string,
        q: PropTypes.string,
      }),
    }).isRequired,
    user: ImmutablePropTypes.map.isRequired,
  };

  constructor(props) {
    super(props);

    this.onChange = ::this.onChange;
    this.onImport = ::this.onImport;
    this.onOffsetChange = ::this.onOffsetChange;
    this.onSearch = ::this.onSearch;

    this.props.dispatch(loadCookie());
    this.props.dispatch(me());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.user.get('token') !== this.props.user.get('token')) {
      dispatch(me());
    }

    if (nextProps.arxiv.getIn(['pagination', 'offset']) !== this.props.arxiv.getIn(['pagination', 'offset'])) {
      this.onSearch();
    }
  }

  onChange(value) {
    this.props.dispatch({ type: SEARCH_ARXIV, value });
  }

  onImport(paper) {
    this.props.dispatch(importPaper(paper));
  }

  onOffsetChange(offset) {
    this.props.dispatch({ type: UPDATE_ARXIV_OFFSET, offset });
  }

  onSearch() {
    this.props.dispatch(search());
  }

  render() {
    const { arxiv } = this.props;

    return (
      <div className="ImportContainer">
        <ImportView
          onChange={this.onChange}
          onImport={this.onImport}
          onOffsetChange={this.onOffsetChange}
          onSearch={this.onSearch}
          arxiv={arxiv}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ImportContainer);
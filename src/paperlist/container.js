import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { getPaperList } from './actions';
import { SEARCH_PAPER_LIST } from './constants';
import PaperListView from './view';

const mapStateToProps = state => ({
  papers: state.paperList.get('papers'),
  search: state.paperList.get('search'),
});

class PaperListContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    papers: ImmutablePropTypes.list.isRequired,
    search: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.onSearch = ::this.onSearch;
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
  }

  onSearch(search) {
    this.props.dispatch({ type: SEARCH_PAPER_LIST, search });
  }

  render() {
    const { papers, search } = this.props;

    return (
      <div className="PaperContainer">
        <PaperListView
          papers={papers}
          onSearch={this.onSearch}
          search={search}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(PaperListContainer);

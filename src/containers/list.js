import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import PaperList from '../components/paper/list';

import { getPapers } from '../actions/papers';

import './container.scss';

const mapStateToProps = (state) => ({
  filters: state.papers.get('filters'),
  papers: state.papers.get('list')
});

class ListContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    papers: PropTypes.object
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getPapers());
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, filters } = this.props;

    if (filters !== nextProps.filters) {
      dispatch(getPapers());
    }
  }

  render() {
    const { papers } = this.props;

    return (
      <div className="Container">
        <PaperList papers={papers || List()} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ListContainer);

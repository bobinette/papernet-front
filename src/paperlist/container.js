import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { getPaperList } from './actions';
import PaperListView from './view';

const mapStateToProps = state => ({
  paperList: state.paperList,
});

class PaperListContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    paperList: ImmutablePropTypes.list.isRequired,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getPaperList());
  }

  render() {
    const { paperList } = this.props;

    return (
      <div className="PaperContainer">
        <PaperListView paperList={paperList} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(PaperListContainer);

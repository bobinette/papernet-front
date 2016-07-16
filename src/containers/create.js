import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import PaperEdit from 'components/paper/edit';

import { RECEIVE_PAPER } from 'constants/events';

import './container.scss';

const mapStateToProps = (state) => ({
  paper: state.paper
});

class CreateContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    paper: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: RECEIVE_PAPER, paper: {} });
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.params.paperId !== this.props.params.paperId) {
      dispatch({ type: RECEIVE_PAPER, paper: {} });
    }
  }

  render() {
    const { paper } = this.props;

    return (
      <div className="Container">
        <PaperEdit paper={paper} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(CreateContainer);

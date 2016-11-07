import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getPaper } from './actions';
import PaperView from './view';

const mapStateToProps = state => ({
  paper: state.paper,
});

class PaperContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    paper: PropTypes.object.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  };

  componentWillMount() {
    const { dispatch, params } = this.props;
    dispatch(getPaper(params.id));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.params.id !== this.props.params.id) {
      dispatch(getPaper(nextProps.params.id));
    }
  }

  render() {
    const { paper } = this.props;

    return (
      <div className="PaperContainer">
        <PaperView paper={paper} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(PaperContainer);

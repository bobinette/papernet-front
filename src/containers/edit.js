import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import PaperEdit from 'edit';

import { getPaper } from 'actions/paper';

import './container.scss';

const mapStateToProps = (state) => ({
  paper: state.paper
});

class EditContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    paper: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(getPaper(params.paperId));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.params.paperId !== this.props.params.paperId) {
      dispatch(getPaper(nextProps.params.paperId));
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

export default connect(mapStateToProps)(EditContainer);

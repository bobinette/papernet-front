import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';

import { getPaper } from 'actions/paper';
import { loadCookie } from 'login/actions';

import Paper from '.';

import './paper.scss';

const mapStateToProps = (state) => ({
  paper: state.paper,
  user: state.user
});

class PaperContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    paper: PropTypes.object
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(loadCookie());
    dispatch(getPaper(params.paperId));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.params.paperId !== this.props.params.paperId) {
      dispatch(getPaper(nextProps.params.paperId));
    }
  }

  render() {
    const { paper, user } = this.props;

    return (
      <div className='PaperContainer'>
        <Paper
          paper={paper || Map()}
          user={user}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(PaperContainer);

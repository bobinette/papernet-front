import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import NavBar from 'components/navbar';
import PaperShow from 'components/paper/show';

import { getPaper } from '../actions/paper';

import './container.scss';

const mapStateToProps = (state) => ({
  paper: state.paper,
  user: state.user
});

class ShowContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    paper: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
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
    const { paper, user } = this.props;

    return (
      <div className='Container'>
        <NavBar username={user.get('name') || ''} />
        <div className='Page'>
          <PaperShow paper={paper} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ShowContainer);

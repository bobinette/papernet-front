import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { paperPropType } from 'utils/constants';
import { loadCookie, me } from 'auth/actions';

import { getPaper } from '../actions';
import NotFoundView from '../notfound';
import PaperView from './view';

const mapStateToProps = state => ({
  found: state.paper.get('found'),
  loading: state.paper.get('loading'),
  paper: state.paper.get('paper'),
});

class PaperViewContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    found: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    paper: paperPropType.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.props.dispatch(loadCookie());
    this.props.dispatch(me());
  }

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
    const { found, loading, paper } = this.props;

    // Dangerous. Replace with a loading page.
    if (loading) return null;

    if (!found) return <NotFoundView />;

    return (
      <div className="PaperContainer container">
        <PaperView paper={paper} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(PaperViewContainer);

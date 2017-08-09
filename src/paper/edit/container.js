import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import { paperPropType } from 'utils/constants';

import { getPaper, savePaper, updatePaper } from '../actions';
import { RESET_PAPER } from '../constants';

import PaperEditView from './view';

const mapStateToProps = state => ({
  canLeave: state.paper.get('canLeave'),
  paper: state.paper.get('paper'),
  loading: state.paper.get('loading'),
});

class PaperEditContainer extends Component {
  static propTypes = {
    canLeave: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    paper: paperPropType.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    router: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    route: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  constructor(props) {
    super(props);

    this.onChange = ::this.onChange;
    this.onSave = ::this.onSave;

    this.routerWillLeave = ::this.routerWillLeave;
  }

  componentWillMount() {
    const { dispatch, params } = this.props;

    if (params.id) {
      dispatch(getPaper(params.id));
    } else {
      dispatch({ type: RESET_PAPER });
    }
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(
      this.props.route,
      this.routerWillLeave,
    );
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.params.id !== this.props.params.id) {
      if (nextProps.params.id) {
        dispatch(getPaper(nextProps.params.id));
      } else {
        dispatch({ type: RESET_PAPER });
      }
    }
  }

  onChange(value) {
    this.props.dispatch(updatePaper(value));
  }

  onSave(leave) {
    const { dispatch, paper } = this.props;
    const promise = dispatch(savePaper(paper));
    if (leave) {
      promise.then(
        (paperId) => { browserHistory.push(`/papers/${paperId}`); },
      );
    }
  }

  routerWillLeave() {
    return this.props.canLeave ? true : 'You are leaving this page. Unsaved changes will be lost';
  }

  render() {
    const { loading, paper } = this.props;

    // Dangerous. Replace with a loading page.
    if (loading) return null;

    return (
      <div className="PaperEditContainer">
        <PaperEditView
          onChange={this.onChange}
          onSave={this.onSave}
          paper={paper}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(PaperEditContainer);

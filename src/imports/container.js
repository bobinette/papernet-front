import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import { loadCookie, me } from 'auth/actions';

import { search } from './actions';
import { SEARCH_IMPORTS } from './constants';
import ImportView from './view';

const mapStateToProps = state => ({
  imports: state.imports,
  user: state.user,
});

class ImportContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    imports: ImmutablePropTypes.contains({
      filters: ImmutablePropTypes.contains({
        title: PropTypes.string,
        q: PropTypes.string,
      }),
    }).isRequired,
    user: ImmutablePropTypes.map.isRequired,
  };

  constructor(props) {
    super(props);

    this.onChange = ::this.onChange;
    this.onSearch = ::this.onSearch;

    this.props.dispatch(loadCookie());
    this.props.dispatch(me());
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;

    if (nextProps.user.get('token') !== this.props.user.get('token')) {
      dispatch(me());
    }
  }

  onChange(value) {
    this.props.dispatch({ type: SEARCH_IMPORTS, value });
  }

  onSearch() {
    this.props.dispatch(search());
  }

  render() {
    const { imports } = this.props;

    return (
      <div className="ImportContainer">
        <ImportView
          onChange={this.onChange}
          onSearch={this.onSearch}
          imports={imports}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ImportContainer);

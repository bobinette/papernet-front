import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import NavBar from 'components/navbar';

// Old school
import { savePaper } from 'paper/actions';

import { loadCookie, me } from 'auth/actions';

import { paperPropType } from 'utils/constants';

import { IMPORTS_IMPORT_START, IMPORTS_IMPORT_DONE } from './api/constants';
import ImportView from './view';

const mapStateToProps = state => ({
  papers: state.imports.get('papers'),
  loading: state.imports.getIn(['status', 'loading']),
  imported: state.imports.getIn(['status', 'imported']),
});

class ImportContainer extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    imported: PropTypes.bool.isRequired,
    papers: ImmutablePropTypes.listOf(paperPropType).isRequired,
  };

  constructor(props) {
    super(props);

    this.onImport = ::this.onImport;

    this.props.dispatch(loadCookie());
    this.props.dispatch(me());
  }

  onImport() {
    const { dispatch, papers } = this.props;

    dispatch({ type: IMPORTS_IMPORT_START });
    Promise.all(papers.map(paper =>
      dispatch(savePaper(paper))
    )).then(
      () => dispatch({ type: IMPORTS_IMPORT_DONE }),
      () => dispatch({ type: IMPORTS_IMPORT_DONE }),
    );
  }

  render() {
    const { loading, imported, papers } = this.props;
    return (
      <div className="ImportContainer">
        <NavBar
          items={[
        { element: <Link className="nav-link" to={'/papers'}>Home</Link>, active: false },
        { element: <Link className="nav-link" to={'/arxiv'}>Arxiv</Link>, active: false },
        { element: <Link className="nav-link" to={'/imports'}>Imports</Link>, active: true },
          ]}
        />
        <div className="container">
          <ImportView
            loading={loading}
            imported={imported}
            papers={papers}
            onImport={this.onImport}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(ImportContainer);

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Link } from 'react-router';

import SplitDropdown from 'components/dropdown/split';
import NavBar, { NAVBAR_HOME } from 'components/navbar';

import TagList from 'components/input/taglist';
import TextEdit from 'components/input/text';
import MarkdownEdit from 'components/input/markdown';

import ReferencesList from './components/references';

import { EDIT_PAPER_FETCH, EDIT_PAPER_RESET, EDIT_PAPER_UPDATE, EDIT_PAPER_REQUIRE_DRIVE } from './api/constants';

import './scene.scss';

const mapDispatchToProps = dispatch => ({
  fetchPaper: id => dispatch({ type: EDIT_PAPER_FETCH, id }),
  requireDrive: () => dispatch({ type: EDIT_PAPER_REQUIRE_DRIVE }),
  onChange: (key, value) => dispatch({ type: EDIT_PAPER_UPDATE, key, value }),
  onSave: () => console.log('save'),
  resetPaper: () => dispatch({ type: EDIT_PAPER_RESET }),
});

const mapStateToProps = state => ({
  canLeave: state.editPaper.get('canLeave'),
  paper: state.editPaper.get('paper'),
  loading: state.editPaper.get('loading'),
});

class EditPaperScene extends PureComponent {

  static propTypes = {
    canLeave: PropTypes.bool.isRequired,
    fetchPaper: PropTypes.func.isRequired,
    requireDrive: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    paper: ImmutablePropTypes.shape({
      title: ImmutablePropTypes.string,
    }).isRequired,
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    resetPaper: PropTypes.func.isRequired,
    router: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    route: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  constructor(props) {
    super(props);

    this.handleKey = ::this.handleKey;
    this.routerWillLeave = ::this.routerWillLeave;

    this.onTagsChange = this.onChange.bind(this, 'tags');
    this.onTitleChange = this.onChange.bind(this, 'title');
    this.onSummaryChange = this.onChange.bind(this, 'summary');
    this.onReferencesChange = this.onChange.bind(this, 'references');
  }

  componentWillMount() {
    const { fetchPaper, requireDrive, params, resetPaper } = this.props;

    if (params.id) {
      fetchPaper(params.id);
    } else {
      resetPaper();
    }

    requireDrive();

    document.addEventListener('keydown', this.handleKey, false);
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(
      this.props.route,
      this.routerWillLeave,
    );
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKey, false);
  }

  onChange(key, value) {
    this.props.onChange(key, value);
  }

  handleKey(event) {
    if ((event.ctrlKey || event.metaKey) && event.keyCode === 83) { // 83 = s
      event.preventDefault();
      const { onSave } = this.props;
      const leave = event.shiftKey;
      onSave(leave);
      return false;
    }
    return true;
  }

  routerWillLeave() {
    return this.props.canLeave ? true : 'You are leaving this page. Unsaved changes will be lost';
  }

  render() {
    const { loading, onSave, paper } = this.props;

    // @TODO: replace with a loading page.
    if (loading) return null;

    const tags = paper.get('tags') || List();
    const cancelUrl = paper.get('id') ? `/papers/${paper.get('id')}` : '/papers';

    return (
      <div className="EditPaper container">
        <NavBar activeTab={NAVBAR_HOME}>
          <SplitDropdown
            btnStyle="inverse-primary"
            onClick={() => onSave(true)}
            menu={[
              <button key="save-and-stay" className="btn dropdown-item" onClick={() => onSave(false)}>
                Save (stay)
              </button>,
              <div key="dropdown-divider-1" className="dropdown-divider" />,
              <Link key="cancel" className="btn dropdown-item" to={cancelUrl}>Cancel</Link>,
            ]}
            title="Save"
          />
        </NavBar>
        <div className="EditPaper__Content col-md-10 offset-md-1">
          <TagList
            onChange={this.onTagsChange}
            placeholder="Add tag..."
            value={tags}
          />
          <TextEdit
            className="h3"
            onChange={this.onTitleChange}
            placeholder="Title..."
            value={paper.get('title')}
          />
          <MarkdownEdit
            autoresize
            onChange={this.onSummaryChange}
            placeholder="Summary, in markdown format..."
            value={paper.get('summary')}
          />
          <ReferencesList
            className="EditPaper__References"
            onChange={this.onReferencesChange}
            placeholder="Add reference..."
            value={paper.get('references')}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPaperScene);

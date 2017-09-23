import React, { PureComponent } from 'react';
import { fromJS, List } from 'immutable';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';

import classNames from 'classnames';

import Modal from 'react-modal';
import { toastr } from 'react-redux-toastr';

import CheckBox from 'components/input/checkbox';
import FileButton from 'components/input/file-button';
import SearchBar from 'components/input/text/search-bar';

import { GOOGLE_DRIVE_UPLOAD_FILE, GOOGLE_DRIVE_LIST_FILES } from './api/constants';

import './google-drive-modal.scss';

const mapStateToProps = state => ({
  files: state.googleDrive.get('files'),
  loading: state.googleDrive.get('loading'),
  nextPageToken: state.googleDrive.get('nextPageToken'),
  uploading: state.googleDrive.get('uploading'),
  q: state.googleDrive.get('q'),
});

const mapDispatchToProps = dispatch => ({
  loadFiles: name => dispatch({ type: GOOGLE_DRIVE_LIST_FILES, name }),
  onUploadFile: ({ filename, filetype, data }) =>
    dispatch({ type: GOOGLE_DRIVE_UPLOAD_FILE, filename, filetype, data }),
});

class GoogleDriveModal extends PureComponent {
  static propTypes = {
    files: ImmutablePropTypes.list.isRequired,
    isOpen: PropTypes.bool.isRequired,
    loadFiles: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    nextPageToken: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onUploadFile: PropTypes.func.isRequired,
    uploading: PropTypes.bool.isRequired,
    q: ImmutablePropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    nextPageToken: '',
  };

  constructor(props) {
    super(props);

    this.onAddReferences = this.onAddReferences.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onLoadFile = this.onLoadFile.bind(this);

    this.state = {
      selected: fromJS({}),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen && !this.props.isOpen) {
      this.props.loadFiles('');
    }
  }

  onAddReferences() {
    const { files, onClose } = this.props;
    const { selected } = this.state;

    const references = files.filter(f => selected.get(f.get('id'))).map(f => f.get('url'));
    this.setState({ selected: fromJS({}) });
    onClose(references);
  }

  onCancel() {
    this.setState({ selected: fromJS({}) });
    this.props.onClose(List());
  }

  onLoadFile({ filename, filetype, data, error }) {
    if (error) {
      toastr.error('Error loading file', `Error: ${error}`);
    } else {
      this.props.onUploadFile({ filename, filetype, data });
    }
  }

  onSelectFile(fileId) {
    return e => {
      this.setState({ selected: this.state.selected.set(fileId, e.target.checked) });
    };
  }

  onSearch(q) {
    this.setState({ selected: fromJS({}) });
    this.props.loadFiles(q);
  }

  render() {
    const { files, isOpen, loading, nextPageToken, q, uploading } = this.props;
    const { selected } = this.state;

    return (
      <Modal
        className="GoogleDriveModal"
        overlayClassName="GoogleDriveModalOverlay"
        isOpen={isOpen}
        onRequestClose={this.onCancel}
        closeTimeoutMS={0}
        contentLabel="Share-paper-modal"
      >
        <h4 className="GoogleDriveModal__Header">Add a reference from Google Drive</h4>
        <div className="GoogleDriveModal__Content">
          <div className="GoogleDriveModal__SearchAndUpload">
            <SearchBar className="GoogleDriveModal__SearchBar" onSearch={this.props.loadFiles} value={q.get('name')} />
            <FileButton
              className="GoogleDriveModal__FileButton"
              id="google-drive-upload"
              onLoadFile={this.onLoadFile}
              disabled={uploading}
            >
              <span className={classNames('btn btn-secondary', { disabled: uploading })}>
                <i className="fa fa-upload" />
                {uploading ? (
                  <span>
                    Uploading... <i className="fa fa-circle-o-notch fa-spin fa-fw" />
                  </span>
                ) : (
                  'Upload file'
                )}
              </span>
            </FileButton>
          </div>
          {loading ? (
            <div className="GoogleDriveModal__Loading">
              <i className="fa fa-circle-o-notch fa-spin fa-fw" /> Loading...
            </div>
          ) : (
            <ul className="GoogleDriveModal__Rows">
              {files.map(f => (
                <li className="GoogleDriveModal__Row" key={f.get('id')}>
                  <CheckBox
                    id={f.get('id')}
                    checked={selected.get(f.get('id')) || false}
                    onChange={this.onSelectFile(f.get('id'), 'see')}
                    label={f.get('name')}
                  />
                </li>
              ))}
            </ul>
          )}
          <div className="text-muted GoogleDriveModal__PageInfo">
            {nextPageToken !== '' && (
              <small>
                Showing only {files.size} results. If you do not see the file you want please use the search bar
              </small>
            )}
          </div>
        </div>
        <div className="GoogleDriveModal__Footer">
          <button type="button" className="btn btn-link" onClick={this.onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-primary" onClick={this.onAddReferences}>
            Add
          </button>
        </div>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleDriveModal);

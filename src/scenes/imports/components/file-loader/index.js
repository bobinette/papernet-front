import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { FILE_LOADER_LOAD } from './api/constants';

const mapDispatchToProps = dispatch => ({
  onLoadFile: file => dispatch({ type: FILE_LOADER_LOAD, file }),
});

class FileLoader extends PureComponent {
  static propTypes = {
    onLoadFile: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.onLoadFile = ::this.onLoadFile;

    this.state = { file: '' };
  }

  onLoadFile(evt) {
    if (evt.target.files.length !== 1) return;

    const file = evt.target.files[0];
    this.props.onLoadFile(file);
  }

  render() {
    return (
      <div className="FileLoader">
        <input
          type="file"
          onChange={this.onLoadFile}
        />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(FileLoader);

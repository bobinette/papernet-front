import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import fileService from 'services/files';

import './file-button.scss';

class FileButton extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onLoadFile: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: '',
    disabled: false,
  };

  constructor(props) {
    super(props);

    this.onLoadFile = this.onLoadFile.bind(this);
  }

  async onLoadFile(evt) {
    if (evt.target.files.length !== 1) return;

    // @TODO: loop on all files?
    const file = evt.target.files[0];

    const filename = file.name;
    const { filetype, data, error } = await fileService.load(file);
    this.props.onLoadFile({ filename, filetype, data, error });
  }

  render() {
    const { children, className, disabled, id } = this.props;
    return (
      <div className={classNames('FileButton', className)}>
        <label className="FileButton__Label" htmlFor={`file-button-label-${id}`}>
          {children}
          <input
            className="FileButton__Input"
            id={`file-button-label-${id}`}
            type="file"
            onChange={this.onLoadFile}
            disabled={disabled}
          />
        </label>
      </div>
    );
  }
}

export default FileButton;

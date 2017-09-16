import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import classNames from 'classnames';
import Tooltip from 'rc-tooltip';

import TextList from 'components/input/textlist';

import googleDriveLogo from './gdrive.png';
import './references.scss';

const ReferencesList = ({ className, hasAccessToDrive, onChange, onGoogleDrive, placeholder, value }) => (
  <div className="ReferencesList">
    <TextList
      className={classNames('ReferencesList__TextList', className)}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
    <button className="ReferencesList__GoogleDriveButton btn btn-secondary" onClick={onGoogleDrive}>
      <Tooltip
        placement="bottom"
        mouseEnterDelay={0.3}
        overlay={
          <small>
            Reference files from your Google Drive
            {!hasAccessToDrive && ' (you will need to give Papernet the permission to access your Google Drive)'}
          </small>
        }
      >
        <img
          className={classNames('GoogleDrive__Logo', { desaturate: !hasAccessToDrive })}
          height="20"
          src={googleDriveLogo}
          alt="google drive"
        />
      </Tooltip>
    </button>
  </div>
);

ReferencesList.propTypes = {
  className: PropTypes.string,
  hasAccessToDrive: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onGoogleDrive: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: ImmutablePropTypes.list.isRequired,
};

ReferencesList.defaultProps = {
  className: '',
  placeholder: '',
};

export default ReferencesList;

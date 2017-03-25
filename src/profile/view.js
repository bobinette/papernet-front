import React from 'react';

import { userPropType } from 'utils/constants';

import './view.scss';

const ProfileView = ({ user }) => (
  <div className="ProfileView">
    <h1 className="display-4">Profile</h1>
    <form className="ProfileView__Infos container">
      <div className="row">
        <div className="col-md-2 col-form-label">Name</div>
        <div className="col-md-10 col-form-label">
          {user.get('name')}
        </div>
      </div>
      <div className="row">
        <div className="col-md-2 col-form-label">Email</div>
        <div className="col-md-10 col-form-label">
          {user.get('email')}
        </div>
      </div>
    </form>
  </div>
);

ProfileView.propTypes = {
  user: userPropType.isRequired,
};

export default ProfileView;

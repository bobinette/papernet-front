import React from 'react';

import NavBar, { NAVBAR_HOME } from 'components/navbar';

import icon from 'H2O.png';

import './notfound.scss';

const NotFoundView = () => (
  <div className="NotFoundView">
    <NavBar
      activeTab={NAVBAR_HOME}
    />
    <div>
      <h1>
        <img className="d-inline-block align-top" src={icon} width="40" height="40" alt="" />
        404
      </h1>
      <large>The resource could not be found</large>
    </div>
  </div>
);

export default NotFoundView;

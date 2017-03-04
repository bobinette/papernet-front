import React from 'react';

import './footer.scss';

const Footer = () => (
  <div className="Footer">
    <hr />
    <div className="container">
      <div className="col-md-2 offset-md-1 ">
        <a className="Footer__Column" href="/terms-of-use">Terms of Use</a>
      </div>
      <div className="col-md-2">
        <a className="Footer__Column" href="/privacy">Privacy Policy</a>
      </div>
      <div className="col-md-2" />
      <div className="col-md-2">
        <a className="Footer__Column" href="/">Help</a>
      </div>
      <div className="col-md-2">
        <a className="Footer__Column" href="mailto:papernet@bobi.space">Contact us</a>
      </div>
    </div>
  </div>
);

export default Footer;

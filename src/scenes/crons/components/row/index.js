import React, { PureComponent } from 'react';

import ImmutablePropTypes from 'react-immutable-proptypes';

class CronRow extends PureComponent {
  static propTypes = {
    cron: ImmutablePropTypes.map.isRequired,
  };

  render() {
    const { cron } = this.props;

    return (
      <div className="card">
        <div className="card-block">
          <form className="container">
            <div className="row">
              <div className="col-md-2">Search query</div>
              <div className="col-md-10">{cron.get('q')}</div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CronRow;

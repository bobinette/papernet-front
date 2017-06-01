import React from 'react';

import { paperPropType } from 'utils/constants';

import Markdown from 'components/markdown';

import './row.scss';

const ImportViewRow = ({ paper }) => (
  <div className="ImportViewRow card">
    <h2 className="ImportViewRow__Title card-header">{paper.get('title')}</h2>
    <div className="card-block">
      <Markdown className="card-text" text={paper.get('summary')} />
    </div>
  </div>
);

ImportViewRow.propTypes = {
  paper: paperPropType.isRequired,
};

export default ImportViewRow;

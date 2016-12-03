import React from 'react';
import { Link } from 'react-router';

import { List } from 'immutable';

import TagList from 'components/taglist';

import { paperPropType } from 'utils/constants';

import './row.scss';

const extractAbstract = (text) => {
  let end = text.indexOf('#');
  if (end === -1) {
    end = text.length;
  }

  return text.substring(0, end);
};

const PaperListViewRow = ({ paper }) => {
  const tags = paper.get('tags') || List();
  let abstract = extractAbstract(paper.get('summary'));
  let tooLong = false;

  if (abstract && abstract.length > 200) {
    abstract = abstract.substring(0, 197);
    tooLong = true;
  }
  return (
    <div className="PaperListViewRow card">
      <div className="card-block" to={`/papers/${paper.get('id')}`}>
        <Link to={`/papers/${paper.get('id')}`}>
          <h5 className="card-title">{paper.get('title')}</h5>
          {abstract !== null ?
            <div className="card-text">{abstract}{tooLong ? '...' : null}</div>
            : null
          }
        </Link>
      </div>
      <div className="PaperListViewRow__Tags card-footer">
        <i className="fa fa-tag" />
        <TagList tags={tags} max={5} />
      </div>
    </div>
  );
};

PaperListViewRow.propTypes = {
  paper: paperPropType,
};

export default PaperListViewRow;

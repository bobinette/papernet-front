import React from 'react';
import { List } from 'immutable';
import { Link } from 'react-router';

import moment from 'moment';

import PropTypes from 'prop-types';

import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

import ReadMoreMarkdown from 'components/markdown/read-more';
import TagList from 'components/taglist';

import { paperPropType } from 'utils/constants';

import './row.scss';

const extractAbstract = (text) => {
  const stops = ['#', '\n'];
  let end = text.length;
  stops.forEach((stop) => {
    const i = text.indexOf(stop);
    if (i > 0 && i < end) {
      end = i;
    }
  });

  return text.substring(0, end);
};

const ImportButtonOrLink = ({ paperID, onImport }) => {
  if (paperID !== 0) {
    return (
      <Link
        className="btn btn-sm btn-outline-primary"
        to={`papers/${paperID}`}
      >
        See on Papernet
      </Link>
    );
  }

  return (
    <button className="btn btn-sm btn-primary" onClick={onImport}>
      Import in Papernet
    </button>
  );
};

ImportButtonOrLink.propTypes = {
  paperID: PropTypes.number.isRequired,
  onImport: PropTypes.func.isRequired,
};

const ImportRow = ({ onImport, paper }) => {
  const abstract = extractAbstract(paper.get('summary'));

  const tags = paper.get('tags') || List();

  return (
    <div className="ImportRow card">
      <div className="card-block">
        <h5 className="card-title">{paper.get('title')}</h5>
        <ReadMoreMarkdown text={abstract} />
        <div className="card-text ImportRow__Links">
          <ImportButtonOrLink paperID={paper.get('id')} onImport={onImport} />
          <a
            href={paper.getIn(['references', 0])}
            className="btn btn-sm btn-outline-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            See on arXiv
          </a>
          <a
            href={paper.getIn(['references', 1])}
            className="btn btn-sm btn-outline-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            PDF
          </a>
        </div>
        <p className="card-text">
          <small
            className="text-muted"
            data-for={paper.get('id').toString()}
            data-tip
          >
            <Tooltip
              placement="bottom"
              mouseEnterDelay={0.3}
              overlay={<small>{moment(paper.get('updatedAt')).format('LLL')}</small>}
            >
              <span>Modified {moment(paper.get('updatedAt')).fromNow()}</span>
            </Tooltip>
          </small>
        </p>
      </div>
      <div className="card-footer">
        <div className="ImportRow__Tags">
          <i className="fa fa-tag" />
          <TagList tags={tags} max={5} />
        </div>
      </div>
    </div>
  );
};

ImportRow.propTypes = {
  onImport: PropTypes.func.isRequired,
  paper: paperPropType.isRequired,
};

export default ImportRow;

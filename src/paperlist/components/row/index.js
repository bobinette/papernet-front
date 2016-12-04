import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import { List } from 'immutable';

import classNames from 'classnames';

import TagList from 'components/taglist';

import { paperPropType, userPropType } from 'utils/constants';

import './row.scss';

const extractAbstract = (text) => {
  let end = text.indexOf('#');
  if (end === -1) {
    end = text.length;
  }

  return text.substring(0, end);
};

const PaperListViewRow = ({ onBookmark, paper, user }) => {
  const tags = paper.get('tags') || List();
  let abstract = extractAbstract(paper.get('summary'));
  let tooLong = false;

  if (abstract && abstract.length > 200) {
    abstract = abstract.substring(0, 197);
    tooLong = true;
  }

  const bookmarked = user.get('bookmarks').includes(paper.get('id'));
  const bookmarkClasses = {
    fa: true,
    'fa-bookmark-o': !bookmarked,
    'fa-bookmark': bookmarked,
  };

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
      <div className="card-footer">
        <div className="PaperListViewRow__Tags">
          <i className="fa fa-tag" />
          <TagList tags={tags} max={5} />
        </div>
        <div className="PaperListViewRow__Bookmark">
          <button onClick={() => onBookmark(paper.get('id'))}>
            <i className={classNames(bookmarkClasses)} />
          </button>
        </div>
      </div>
    </div>
  );
};

PaperListViewRow.propTypes = {
  onBookmark: PropTypes.func.isRequired,
  paper: paperPropType,
  user: userPropType,
};

export default PaperListViewRow;

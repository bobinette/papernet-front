import React from 'react';
import { Link } from 'react-router';
import { List } from 'immutable';

import classNames from 'classnames';
import moment from 'moment';

import PropTypes from 'prop-types';

import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

import TagList from 'components/taglist';
import ReadMoreMarkdown from 'components/markdown/read-more';

import { paperPropType, userPropType } from 'utils/constants';

import './row.scss';

const extractAbstract = (text) => {
  const stops = ['#', '\n'];
  let end = text.length;
  stops.forEach((stop) => {
    const i = text.indexOf(stop);
    if (i >= 0 && i < end) {
      end = i;
    }
  });

  return text.substring(0, end);
};

const PaperListViewRow = ({ onBookmark, paper, user }) => {
  const tags = paper.get('tags') || List();
  const abstract = extractAbstract(paper.get('summary'));

  let bookmarkClasses = {};
  if (user && onBookmark) {
    const bookmarks = user.get('bookmarks') || List();
    const bookmarked = bookmarks.includes(paper.get('id'));

    bookmarkClasses = {
      fa: true,
      'fa-bookmark-o': !bookmarked,
      'fa-bookmark': bookmarked,
    };
  }

  return (
    <div className="PaperListViewRow card">
      <div className="card-block">
        <Link to={`/papers/${paper.get('id')}`}>
          <h5 className="card-title">{paper.get('title')}</h5>
          <ReadMoreMarkdown text={abstract} />
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
        </Link>
      </div>
      <div className="card-footer">
        <div className="PaperListViewRow__Tags">
          <i className="fa fa-tag" />
          <TagList tags={tags} max={5} />
        </div>
        {user && onBookmark &&
          <div className="PaperListViewRow__Bookmark">
            <button onClick={() => onBookmark(paper.get('id'))}>
              <i className={classNames(bookmarkClasses)} />
            </button>
          </div>
        }
      </div>
    </div>
  );
};

PaperListViewRow.propTypes = {
  onBookmark: PropTypes.func.isRequired,
  paper: paperPropType.isRequired,
  user: userPropType.isRequired,
};

export default PaperListViewRow;

import React from 'react';
import { Link } from 'react-router';
import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import moment from 'moment';

import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

import Markdown from 'components/markdown';
import NavBar from 'components/navbar';
import TagList from 'components/taglist';

import './view.scss';

const PaperView = ({ paper }) => {
  if (!paper.get('id')) return null;

  const tags = paper.get('tags') || List();
  const resources = paper.get('resources') || List();

  return (
    <div className="PaperView">
      <NavBar
        items={[<Link className="nav-link" to={`/papers/${paper.get('id')}/edit`}>Edit</Link>]}
      />
      <div className="PaperView__Content row">
        <TagList className="col-md-10 offset-md-1" tags={tags} />
        <div className="col-md-10 offset-md-1" >
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
        </div>
        <div className="col-md-10 offset-md-1">
          <h1 className="display-3">{paper.get('title')}</h1>
          <Markdown text={paper.get('summary')} />
          <ul>
            {
              resources.map((res, i) => <li key={i}>res</li>)
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

PaperView.propTypes = {
  paper: ImmutablePropTypes.shape({
    title: ImmutablePropTypes.string,
  }).isRequired,
};

export default PaperView;

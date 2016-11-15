import React from 'react';

import { List } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Link } from 'react-router';

import { Textfit } from 'react-textfit';

import Markdown from 'components/markdown';
import TagList from 'components/taglist';

import './view.scss';

const PaperView = ({ paper }) => {
  const tags = paper.get('tags') || List();

  return (
    <div className="PaperView">
      <div className="PaperView__LeftPanel">
        <div className="PaperView__LeftPanel__Links">
          <Link to={'/papers'}><i className="mdi mdi-arrow-left" />Home</Link>
          <Link to={`/papers/${paper.get('id')}/edit`}><i className="mdi mdi-pencil" />Edit</Link>
        </div>
        <div className="PaperView__LeftPanel__Tags">
          <h3 className="PaperView__LeftPanel__TagsLabel"><i className="mdi mdi-tag" />Tags:</h3>
          <TagList tags={tags} />
        </div>
      </div>
      <div className="PaperView__Content">
        <h1 className="PaperView__Title">
          <Textfit mode="single" max={35}>
            {paper.get('title')}
          </Textfit>
        </h1>
        <Markdown
          text={paper.get('summary')}
        />
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

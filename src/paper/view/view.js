import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Link } from 'react-router';

import { Textfit } from 'react-textfit';

import Markdown from 'components/markdown';

import './view.scss';

const PaperView = ({ paper }) => (
  <div className="PaperView">
    <div className="PaperView__LeftPanel">
      <div className="PaperView__LeftPanel__Links">
        <Link to={'/papers'}><i className="mdi mdi-arrow-left" />Home</Link>
        <Link to={`/papers/${paper.get('id')}/edit`}><i className="mdi mdi-pencil" />Edit</Link>
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

PaperView.propTypes = {
  paper: ImmutablePropTypes.shape({
    title: ImmutablePropTypes.string,
  }).isRequired,
};

export default PaperView;

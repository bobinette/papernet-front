import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Textfit } from 'react-textfit';

import Markdown from 'components/markdown';

const PaperView = ({ paper }) => (
  <div className="PaperView">
    <h1 className="PaperView__Title">
      <Textfit mode="single" max={35}>
        {paper.get('title')}
      </Textfit>
    </h1>
    <Markdown
      text={paper.get('summary')}
    />
  </div>
);

PaperView.propTypes = {
  paper: ImmutablePropTypes.shape({
    title: ImmutablePropTypes.string,
  }).isRequired,
};

export default PaperView;

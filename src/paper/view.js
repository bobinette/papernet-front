import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Textfit } from 'react-textfit';

import Markdown from 'components/markdown';

class PaperView extends Component {
  static propTypes = {
    paper: ImmutablePropTypes.shape({
      title: ImmutablePropTypes.string,
    }).isRequired,
  };

  render() {
    const { paper } = this.props;

    return (
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
  }
}

export default PaperView;

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import Markdown from '.';

class ReadMoreMarkdown extends PureComponent {
  static propTypes = {
    max: PropTypes.number,
    text: PropTypes.string.isRequired,
  };

  static defaultProps = {
    max: 300,
  };

  constructor(props) {
    super(props);

    this.onClick = ::this.onClick;

    this.state = { open: false };
  }

  onClick(e) {
    this.setState({ open: !this.state.open });
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const { max, text } = this.props;
    const { open } = this.state;

    if (!text) return null;

    let displayedText = text;
    const tooLong = displayedText.length > max;
    if (!open && tooLong) {
      displayedText = `${displayedText.substring(0, max - 3)}...`;
    }

    return (
      <div className="card-text">
        <Markdown text={displayedText} />
        {tooLong &&
        <button className="btn btn-sm btn-link" onClick={this.onClick}>
          Show {open ? 'less' : 'more'}
        </button>
        }
      </div>
    );
  }
}

export default ReadMoreMarkdown;

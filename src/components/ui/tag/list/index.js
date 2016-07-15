import React, { Component, PropTypes } from 'react';

import classNames from 'classnames';

import Tag from '..';

import './list.scss';

class TagList extends Component {
  static propTypes = {
    classes: PropTypes.object,
    onClear: PropTypes.func.isRequired,
    tags: PropTypes.object.isRequired
  }

  static defaultProps = {
    classes: {}
  }

  onClear(tag) {
    const { onClear } = this.props;
    onClear(tag);
  }

  render() {
    const { classes, tags } = this.props;

    classes.TagList__Values = true;
    return (
      <div className={classNames(classes)}>
        {
          tags.toSeq().map((tag) => {
            const onClear = this.onClear.bind(this, tag);
            return (
              <div className='TagList__Tag' key={tag.get('value')}>
                <Tag text={tag.get('label')} onClear={onClear}/>
              </div>
            );
          }).toJS()
        }
      </div>
    );
  }
}

export default TagList;

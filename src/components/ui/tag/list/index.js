import React, { Component, PropTypes } from 'react';

import classNames from 'classnames';

import Tag from 'components/ui/tag';

import './list.scss';

class TagList extends Component {
  static propTypes = {
    classes: PropTypes.object,
    onClear: PropTypes.func,
    tags: PropTypes.object.isRequired
  }

  static defaultProps = {
    classes: {},
    onClear: null
  }

  render() {
    const { classes, onClear, tags } = this.props;

    classes.TagList__Values = true;
    return (
      <div className={classNames(classes)}>
        {
          tags.toSeq().map((tag) => {
            const onClearTag = onClear && onClear.bind(this, tag);
            return (
              <div className='TagList__Tag' key={tag.get('value')}>
                <Tag text={tag.get('label')} onClear={onClearTag}/>
              </div>
            );
          }).toJS()
        }
      </div>
    );
  }
}

export default TagList;

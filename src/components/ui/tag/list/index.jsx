import React, { Component, PropTypes } from 'react';

import Tag from '..';

import './list.scss';

class TagList extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    tags: PropTypes.object.isRequired
  }

  onClear(i) {
    const { tags, onChange } = this.props;
    onChange(tags.remove(i));
  }

  render() {
    const { tags } = this.props;

    return (
      <div className='TagList__Values'>
        {
          tags.map((tag, i) => {
            const onClear = this.onClear.bind(this, i);
            return (
              <div className='TagList__Tag' key={tag}>
                <Tag text={tag} onClear={onClear}/>
              </div>
            );
          })
        }
      </div>
    );
  }
}

export default TagList;

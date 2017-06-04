import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import './taglist.scss';

const TagList = ({ className, tags, max }) => {
  let maxedTags = tags;
  let diff = 0;
  if (max > 0 && tags.size > max) {
    maxedTags = tags.slice(0, max);
    diff = tags.size - maxedTags.size;
  }

  return (
    <div className={`TagList ${className}`}>
      <div className="TagList__Tags">
        {maxedTags.map(tag => (
          <div className="TagList__Tag" key={tag}>
            <div>{tag}</div>
          </div>
        ))}
        {diff > 0 && <div>And {diff} more...</div>}
      </div>
    </div>
  );
};

TagList.propTypes = {
  className: PropTypes.string,
  max: PropTypes.number,
  tags: ImmutablePropTypes.list.isRequired,
};

TagList.defaultProps = {
  className: '',
  max: 0,
};

export default TagList;

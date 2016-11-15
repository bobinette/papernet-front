import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const TagList = ({ className, tags }) => (
  <div className={`TagList ${className}`}>
    <div className="TagList__Tags">
      {tags.map((tag, i) => (
        <div className="TagList__Tag" key={i}>
          <div>{tag}</div>
        </div>
      ))}
    </div>
  </div>
);

TagList.propTypes = {
  className: PropTypes.string,
  tags: ImmutablePropTypes.list.isRequired,
};

TagList.defaultProps = {
  className: '',
};

export default TagList;

import React, { PropTypes } from 'react';

import classNames from 'classnames';
import katex from 'katex';

import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

const Equation = ({ equation }) => {
  let elt;
  const classes = {};
  try {
    elt = (
      <span
        dangerouslySetInnerHTML={{  // eslint-disable-line react/no-danger
          __html: katex.renderToString(equation, { displayMode: true }),
        }}
      />
    );
  } catch (e) {
    elt = (
      <div>
        <div className="Markdown__ErrorMessage">
          <i className="fa fa-exclamation-triangle" />
          Could not render equation: ${e.message}
        </div>
        {elt}
      </div>
    );
    classes.Markdown__Error = true;
  }
  return <span className={classNames(classes)}>{elt}</span>;
};

Equation.propTypes = {
  equation: PropTypes.string.isRequired,
};

const InlineEquation = ({ equation }) => {
  let elt;
  try {
    elt = (
      <span
        dangerouslySetInnerHTML={{  // eslint-disable-line react/no-danger
          __html: katex.renderToString(equation, { displayMode: false }),
        }}
      />
    );
  } catch (e) {
    elt = (
      <span>
        <Tooltip
          placement="bottom"
          mouseEnterDelay={0.3}
          overlay={`Could not render equation: ${e.message}`}
        >
          <code>{equation}</code>
        </Tooltip>
      </span>
    );
  }
  return <span>{elt}</span>;
};

InlineEquation.propTypes = {
  equation: PropTypes.string.isRequired,
};

export { Equation };
export { InlineEquation };

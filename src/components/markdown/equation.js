import React from 'react';

import ClipboardButton from 'react-clipboard.js';

import classNames from 'classnames';
import katex from 'katex';

import PropTypes from 'prop-types';

import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

const Equation = ({ equation }) => {
  let elt;
  const classes = { Equation: true };
  try {
    elt = (
      <span
        className="Equation__Equation"
        dangerouslySetInnerHTML={{  // eslint-disable-line react/no-danger
          __html: katex.renderToString(equation, { displayMode: true }),
        }}
      />
    );
  } catch (e) {
    elt = (
      <div className="col-md-11">
        <div className="Markdown__ErrorMessage">
          <i className="fa fa-exclamation-triangle" />
          Could not render equation: ${e.message}
        </div>
        {elt}
      </div>
    );
    classes.Markdown__Error = true;
  }
  return (
    <div className={classNames(classes)}>
      {elt}
      <div>
        <ClipboardButton className="btn btn-outline-primary btn-sm" data-clipboard-text={equation}>
          <Tooltip
            placement="top"
            trigger={['click']}
            mouseEnterDelay={0.1}
            overlay="Copied!"
          >
            <i className="fa fa-clipboard" />
          </Tooltip>
        </ClipboardButton>
      </div>
    </div>
  );
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

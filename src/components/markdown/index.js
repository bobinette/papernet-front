import React, { PropTypes } from 'react';
import classNames from 'classnames';

import remark from 'remark';
import remarkReact from 'remark-react';
import githubSanitize from 'hast-util-sanitize/lib/github.json';

import merge from 'deepmerge';

import katex from 'katex';

import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

import inlineMath from './inline-math';

import './markdown.scss';

const escape = (html, encode) => (
  html
  .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')
);

// Code
// Renders code highilighted according to its language. Custom languages are:
//  - equation: render Latex equation with katex
//  - warning: render a warning block
const renderCode = (code, lang, key) => {
  // Equation
  if (lang === 'equation' || lang === 'inlineEquation') {
    let eq = code;
    const classes = {
      Markdown__Equation: true,
    };
    try {
      eq = (
        <span
          dangerouslySetInnerHTML={{  // eslint-disable-line react/no-danger
            __html: katex.renderToString(code, { displayMode: lang === 'equation' }),
          }}
        />
      );
    } catch (e) {
      eq = (
        <div>
          <div className="Markdown__ErrorMessage">
            <i className="mdi mdi-alert" />
            Could not render equation: ${e.message}
          </div>
          {eq}
        </div>
      );
      classes.Markdown__Error = true;
    }
    return <span key={key} className={classNames(classes)}>{eq}</span>;
  }

  // Warning
  if (lang === 'warning') {
    const warning = (
      <div className="Markdown__Warning" key={key} >
        <i className="mdi mdi-alert" />
        {code}
      </div>
    );
    return warning;
  }

  // Standard code
  const codeClass = {};
  if (lang) {
    codeClass[escape(lang, true)] = true;
  }
  let escapedCode = code;
  if (lang) {
    escapedCode = hljs.highlight(lang, code).value;
  } else {
    escapedCode = escape(code, true);
  }
  return (
    <code
      className={classNames(codeClass)}
      dangerouslySetInnerHTML={{  // eslint-disable-line react/no-danger
        __html: escapedCode,
      }}
    />
  );
};

const createElement = (name, attrs, children) => {
  const langPrefix = 'language-';
  switch (name) {
    case 'code':
      return renderCode(
        children[0],
        attrs.className ? attrs.className.substring(langPrefix.length) : undefined,
        attrs.key,
      );
    default:
  }
  return React.createElement(name, attrs, children);
};

const Markdown = ({ text, className }) => {
  const sanitize = merge(githubSanitize, { attributes: { '*': ['className'] } });
  const md = remark().use(inlineMath).use(remarkReact, {
    createElement,
    sanitize,
  }).process(text).contents;

  return <div className={`Markdown ${className}`}>{md}</div>;
};

Markdown.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

Markdown.defaultProps = {
  className: '',
};

export default Markdown;

import React, { PropTypes } from 'react';
import classNames from 'classnames';

import remark from 'remark';
import remarkParse from 'remark-parse';

import katex from 'katex';

import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

import './markdown.scss';

const escape = (html, encode) => (
  html
  .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')
);

const renderHeading = (token, key) => {
  const depth = token.depth;
  const text = renderTokens(token.children); // eslint-disable-line no-use-before-define

  return {
    1: txt => <h1 key={key}>{txt}</h1>,
    2: txt => <h2 key={key}>{txt}</h2>,
    3: txt => <h3 key={key}>{txt}</h3>,
    4: txt => <h4 key={key}>{txt}</h4>,
    5: txt => <h5 key={key}>{txt}</h5>,
    6: txt => <h6 key={key}>{txt}</h6>,
  }[depth](text);
};

// Code
// Renders code highilighted according to its language. Custom languages are:
//  - equation: render Latex equation with katex
//  - warning: render a warning block
const renderCode = (code, lang, key) => {
  // Equation
  if (lang === 'equation') {
    let eq = code;
    const classes = {
      Markdown__Equation: true,
    };
    try {
      eq = (
        <span
          dangerouslySetInnerHTML={{  // eslint-disable-line react/no-danger
            __html: katex.renderToString(code, { displayMode: true }),
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
          {eq};
        </div>
      );
      classes.Markdown__Error = true;
    }
    return <div key={key} className={classNames(classes)}>{eq}</div>;
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
    <pre key={key} >
      <code
        className={classNames(codeClass)}
        dangerouslySetInnerHTML={{  // eslint-disable-line react/no-danger
          __html: escapedCode,
        }}
      />
    </pre>
  );
};

// Inline code
const renderInlineCode = (code, key) => {
  if (code.startsWith('!')) {
    let eq = code.substring(1);
    const classes = {};
    try {
      eq = katex.renderToString(eq, { displayMode: false });
    } catch (_) {
      classes.mdi = true;
      classes['mdi-alert'] = true;
    }
    return (
      <span
        key={key}
        className={classNames(classes)}
        dangerouslySetInnerHTML={{  // eslint-disable-line react/no-danger
          __html: eq,
        }}
      />
    );
  }

  return <code key={key}>{code}</code>;
};

const renderList = (ordered, tokens, key) => {
  const rendered = renderTokens(tokens); // eslint-disable-line no-use-before-define
  return ordered ? <ol key={key}>{rendered}</ol> : <ul key={key}>{rendered}</ul>;
};

const renderTokens = (tokens) => {
  let token = tokens.shift();

  const md = [];
  while (token) {
    switch (token.type) {
      case 'blockquote':
        md.push(<blockquote key={md.length}>{renderTokens(token.children)}</blockquote>);
        break;
      case 'code':
        md.push(renderCode(token.value, token.lang, md.length));
        break;
      case 'emphasis':
        md.push(<em key={md.length}>{renderTokens(token.children)}</em>);
        break;
      case 'heading':
        md.push(renderHeading(token, md.length));
        break;
      case 'inlineCode':
        md.push(renderInlineCode(token.value, md.length));
        break;
      case 'list':
        md.push(renderList(token.ordered, token.children, md.length));
        break;
      case 'listItem':
        md.push(<li key={md.length}>{renderTokens(token.children)}</li>);
        break;
      case 'paragraph':
        md.push(<p key={md.length}>{renderTokens(token.children)}</p>);
        break;
      case 'strong':
        md.push(<strong key={md.length}>{renderTokens(token.children)}</strong>);
        break;
      case 'text':
        md.push(token.value);
        break;
      default:
        console.log('cannot handle token', token); // eslint-disable-line no-console
        break;
    }

    token = tokens.shift();
  }
  return md;
};

const Markdown = ({ text, className }) => {
  const tokens = remark().use(remarkParse).parse(text).children;

  return (
    <div className={`Markdown ${className}`}>
      {renderTokens(tokens)}
    </div>
  );
};

Markdown.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
};

Markdown.defaultProps = {
  className: '',
};

export default Markdown;

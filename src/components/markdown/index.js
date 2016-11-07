import React, { Component, PropTypes } from 'react';

import classNames from 'classnames';

import katex from 'katex';

import marked from 'marked';

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

class EnrichedMarkdown extends Component {
  static propTypes = {
    classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    text: PropTypes.string.isRequired,
  }

  static defaultProps = {
    classes: {},
  };

  constructor(props) {
    super(props);

    marked.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: true,
    });

    this.markdownRenderer = new marked.Renderer();
    this.markdownRenderer.code = (code, lang, escaped) => {
      if (lang === 'equation') {
        return `<div class="Markdown__Equation">${katex.renderToString(code, { displayMode: true })}</div>`;
      }

      const preTag = '<pre class="Markdown__Code">';
      const codeTag = lang ? `<code class="${escape(lang, true)}">` : '<code>';
      let escapedCode = code;
      if (lang) {
        escapedCode = hljs.highlight(lang, code).value;
      } else if (!escaped) {
        escapedCode = escape(code, true);
      }
      return `${preTag}${codeTag}${escapedCode}</code></pre>`;
    };
  }

  renderMarkdown() {
    const { text } = this.props;
    if (!text) return null;

    return (
      <div
        className="Markdown__View"
        dangerouslySetInnerHTML={{ __html: marked(text, { renderer: this.markdownRenderer }) }} // eslint-disable-line react/no-danger
      />
    );
  }

  render() {
    const { classes } = this.props;

    classes.Markdown = true;
    return (
      <div className={classNames(classes)}>
        <div className="Markdown__Content Markdown__Source">
          {this.renderMarkdown()}
        </div>
      </div>
    );
  }
}

export default EnrichedMarkdown;

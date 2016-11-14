import React, { Component, PropTypes } from 'react';

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
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
  };

  static defaultProps = {
    className: '',
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
    this.markdownRenderer.heading = (text, level) => {
      const lvl = level + 1 <= 6 ? level + 1 : level;
      return `<h${lvl}>${text}</h${lvl}>`;
    };
  }

  renderMarkdown() {
    const { text } = this.props;
    if (!text) return null;

    return (
      <div
        className="Markdown__View"
        dangerouslySetInnerHTML={{  // eslint-disable-line react/no-danger
          __html: marked(text, { renderer: this.markdownRenderer }),
        }}
      />
    );
  }

  render() {
    const { className } = this.props;

    return (
      <div className={`Markdown ${className}`}>
        {this.renderMarkdown()}
      </div>
    );
  }
}

export default EnrichedMarkdown;

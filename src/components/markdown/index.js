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

    // Code
    this.markdownRenderer.code = (code, lang, escaped) => {
      if (lang === 'equation') {
        let eq = code;
        let className = 'Markdown__Equation';
        try {
          eq = katex.renderToString(code, { displayMode: true });
        } catch (e) {
          eq = `
<div class="Markdown__ErrorMessage">
  <i class="mdi mdi-alert"></i>
  Could not render equation: ${e.message}
</div>
${eq}`;
          className = `${className} Markdown__Error`;
        }
        return `<div class="${className}">${eq}</div>`;
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

    // Headers: remove one level of heading
    this.markdownRenderer.heading = (text, level) => {
      const lvl = level + 1 <= 6 ? level + 1 : level;
      return `<h${lvl}>${text}</h${lvl}>`;
    };

    // Inline code
    this.markdownRenderer.codespan = (code) => {
      if (code.startsWith('!')) {
        let eq = code.substring(1);
        let className = '';
        try {
          eq = katex.renderToString(eq, { displayMode: false });
        } catch (_) {
          className = 'mdi mdi-alert';
        }
        return `<span class="${className}">${eq}</span>`;
      }

      return `<code>${code}</code>`;
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

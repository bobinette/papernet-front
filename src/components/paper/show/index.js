import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { Link} from 'react-router';
import katex from 'katex';
import sanitize from 'sanitize-caja';

import Markdown from 'react-remarkable';

import Button from 'components/ui/button';
import Tag from 'components/ui/tag';

import './show.scss';

class PaperShow extends Component {

  static propTypes = {
    paper: PropTypes.object.isRequired
  }

  componentDidUpdate() {
    const elts = document.getElementsByClassName('math');
    Array.prototype.forEach.call(elts, function(elt) {
      // Do stuff here
      katex.render(elt.innerHTML, elt, { displayMode: true });
    });
  }

  renderAuthors(paper) {
    if (!paper.get('authors')) return null;

    return (
      <div className='PaperShow__Authors'>
        {
          paper.get('authors').toJS().map((author, i) => {
            return (
              <div key={i}>{author}</div>
            );
          })
        }
      </div>
    );
  }

  renderHeader(paper) {
    const gotoEdit = () => {hashHistory.push('/papers/' + paper.get('id') + '/edit');};
    const gotoHome = () => {hashHistory.push('/');};

    return (
      <div className='PaperShow__Header'>
        <Button
          content={<i className='mdi mdi-home' />}
          onClick={gotoHome}
        />
        <Button
          content={<i className='mdi mdi-pencil' />}
          onClick={gotoEdit}
        />
      </div>
    );
  }

  renderReferences(paper) {
    if (!paper.get('references')) return null;

    return (
      <ul className='PaperShow__References'>
        {
          paper.get('references').toSeq().map((ref, i) => {
            return (
              <li key={'Ref-'+ref}><Link to={`/papers/${ref.get('id')}`}>{ref.get('title')}</Link></li>
            );
          })
        }
      </ul>
    );
  }

  renderTags(paper) {
    if (!paper.get('tags')) return null;

    return (
      <div className='PaperShow__Tags'>
        {
          paper.get('tags').toJS().map((tag) => {
            return (
                <div className='PaperShow__Tag' key={'Tag-'+tag}><Tag text={tag}/></div>
            );
          })
        }
      </div>
    );
  }

  renderSummary(summary) {
    const mathSummary = summary.replace(
      '<eq>', '<div class="math">'
    ).replace('</eq>', '</div>');

    return (
      <div id='PaperShow__Summary'>
        <Markdown
          source={sanitize(mathSummary)}
          options={{ html: true }}
        />
      </div>
    );
  }

  renderURLs(urls) {
    if (!urls) return null;

    return (
      <ul className='PaperShow__URLs'>
        {
          urls.toSeq().map((url) => <li key={'URL-'+url}><a href={url}>{url}</a></li>)
        }
      </ul>
    );
  }

  render() {
    const { paper } = this.props;

    const title = paper.get('title') ? paper.get('title') : <em>No title</em>;
    const summary = paper.get('summary') || '';

    const year = paper.get('year');
    return (
      <div className='PaperShow'>
        {this.renderHeader(paper)}
        <h1 className='PaperShow__Title'>{title} {year > 0 ? '(' + year + ')' : null}</h1>
        <div className='PaperShow__Metadata'>
          {this.renderAuthors(paper)}
          {this.renderTags(paper)}
        </div>
        <h2>Summary</h2>
        <div className='PaperShow__Summary'>
          {this.renderSummary(summary)}
        </div>
        <h2>References</h2>
        {this.renderReferences(paper)}
        <h2>URLs</h2>
        {this.renderURLs(paper.get('urls'))}
      </div>
    );
  }
}

export default PaperShow;

import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { Link} from 'react-router';
import { Map } from 'immutable';

import katex from 'katex';
import sanitize from 'sanitize-caja';

import Markdown from 'react-remarkable';

import Button from 'components/ui/button';
import TagList from 'components/ui/tag/list';

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

  renderEmpty(section) {
    const { paper } = this.props;
    return (
      <div className='PaperShow__Empty'>
        <em className='PaperShow__EmptyMessage'>No {section} - </em>
        <Link to={'/papers/' + paper.get('id') + '/edit'}>Edit</Link>
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

  renderReferences(references) {
    if (!references || references.size === 0) return this.renderEmpty('references');

    return (
      <ul className='PaperShow__References'>
        {
          references.toSeq().map((ref) => {
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
        <TagList
          tags={paper.get('tags').toSeq().map(tag => Map({ value: tag, label: tag }))}
        />
      </div>
    );
  }

  renderSummary(summary) {
    if (!summary) return this.renderEmpty('summary');

    const mathSummary = summary.replace(
      '<eq>', '<div class="math">'
    ).replace('</eq>', '</div>');

    return (
      <div className='PaperShow__Summary'>
        <Markdown
          source={sanitize(mathSummary)}
          options={{ html: true }}
        />
      </div>
    );
  }

  renderURLs(urls) {
    if (!urls || urls.size === 0) return this.renderEmpty('urls');

    return (
      <ul className='PaperShow__URLs'>
        {
          urls.toSeq().map((url) => (
            <li key={'URL-'+url}><a href={url} target='_blank'>{url}</a></li>
          ))
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
        {this.renderSummary(summary)}
        <h2>References</h2>
        {this.renderReferences(paper.get('references'))}
        <h2>Resources</h2>
        {this.renderURLs(paper.get('urls'))}
      </div>
    );
  }
}

export default PaperShow;

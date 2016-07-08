import React, { Component, PropTypes } from 'react';
import { Link} from 'react-router';

import ReactMarkdown from 'react-markdown';

import Tag from '../../../components/ui/tag';

import './show.scss';

class PaperShow extends Component {

  static propTypes = {
    paper: PropTypes.object.isRequired
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
    return (
      <div className='PaperShow__Header'>
        <Link to={'/'} className='PaperShow__HeaderButton'>
          <i className='mdi mdi-home' />
        </Link>
        <Link to={`/papers/${paper.get('id')}/edit`} className='PaperShow__HeaderButton'>
          <i className='mdi mdi-pencil' />
        </Link>
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
              <li key={'Ref-'+ref} key={i}><Link to={`/papers/${ref.get('id')}`}>{ref.get('title')}</Link></li>
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
          paper.get('tags').toJS().map((tag, i) => {
            return (
                <div className='PaperShow__Tag' key={i}><Tag text={tag}/></div>
            );
          })
        }
      </div>
    );
  }

  render() {
    const { paper } = this.props;

    const title = paper.get('title') ? paper.get('title') : <em>No title</em>;
    const summary = paper.get('summary') || '';

    return (
      <div className='PaperShow'>
        {this.renderHeader(paper)}
        <h1 className='PaperShow__Title'>{title}</h1>
        <div className='PaperShow__Metadata'>
          {this.renderAuthors(paper)}
          {this.renderTags(paper)}
        </div>
        <h2>Summary</h2>
        <div className='PaperShow__Summary'>
          <ReactMarkdown
            source={summary}
            escapeHTML
          />
        </div>
        <h2>References</h2>
        {this.renderReferences(paper)}
      </div>
    );
  }
}

export default PaperShow;

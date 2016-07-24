import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Map } from 'immutable';
import { connect } from 'react-redux';


import katex from 'katex';
import sanitize from 'sanitize-caja';

import classNames from 'classnames';

import Markdown from 'react-remarkable';
import { Textfit } from 'react-textfit';

import history from 'routing';

import Header from 'components/header';
import NavBar from 'components/navbar';
import TagList from 'components/ui/tag/list';
import Text from 'components/ui/text';

import './paper.scss';

class Paper extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    paper: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  componentDidUpdate() {
    const elts = document.getElementsByClassName('math');
    Array.prototype.forEach.call(elts, function(elt) {
      // Do stuff here
      katex.render(elt.innerHTML, elt, { displayMode: true });
    });
  }

  onEdit(paperId) {
    history.push('/papers/' + paperId + '/edit');
  }

  renderEmpty(section) {
    const { paper } = this.props;
    return (
      <div className='Paper__Empty'>
        <em className='Paper__EmptyMessage'>No {section} - </em>
        <Link to={'/papers/' + paper.get('id') + '/edit'}>Edit</Link>
      </div>
    );
  }

  renderHeader(paper) {
    const onEdit = this.onEdit.bind(this, paper.get('id'));

    return (
      <div className='Paper__Header'>
        <div className='Paper__Title'>
          <div className='Paper__TitleText'>
            <Textfit mode='single' max={25}>
              {paper.get('title')}
            </Textfit>
          </div>
          {paper.get('year')}
        </div>
        <div className='Paper__EditButton' onClick={onEdit}>
          <i className='mdi mdi-pencil'/>Edit
        </div>
      </div>
    );
  }

  renderReferences(references) {
    if (!references || references.size === 0) return this.renderEmpty('references');

    return (
      <ul className='Paper__References'>
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

  renderSummary(summary) {
    if (!summary) return this.renderEmpty('summary');

    const mathSummary = summary.replace(
      '<eq>', '<div class="math">'
    ).replace('</eq>', '</div>');

    return (
      <div className='Paper__Summary'>
        <Markdown
          source={sanitize(mathSummary)}
          options={{ html: true }}
        />
      </div>
    );
  }

  renderTags(paper) {
    if (!paper.get('tags')) return null;

    return (
      <div className='Paper__Tags'>
        <TagList
          tags={paper.get('tags').toSeq().map(tag => Map({ value: tag, label: tag }))}
        />
      </div>
    );
  }

  renderURLs(urls) {
    if (!urls || urls.size === 0) return this.renderEmpty('urls');

    return (
      <ul className='Paper__URLs'>
        {
          urls.toSeq().map((url) => (
            <li key={'URL-'+url}><a href={url} target='_blank'>{url}</a></li>
          ))
        }
      </ul>
    );
  }

  render() {
    const { paper, user } = this.props;

    const summary = paper.get('summary') || '';
    return (
      <div>
        <NavBar username={user.get('name')} />
        {this.renderHeader(paper)}
        {this.renderTags(paper)}

        <div className='Paper__Body'>
          <h2>Summary</h2>
          {this.renderSummary(summary)}

          <h2>References</h2>
          {this.renderReferences(paper.get('references'))}

          <h2>Resources</h2>
          {this.renderURLs(paper.get('urls'))}
        </div>
      </div>
    );
  }
}

export default connect()(Paper);

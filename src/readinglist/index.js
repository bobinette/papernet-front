import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import classNames from 'classnames';

import NavBar from 'components/navbar';
import Search from 'components/ui/text/search';

import history from 'routing';

import './readinglist.scss';

class ReadingList extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    papers: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onAdd() {
    history.push('papers/new');
  }

  onClick(id) {
    history.push('papers/' + id);
  }

  renderList() {
    const { papers } = this.props;

    return (
      <div className='ReadingList__List'>
        <div className='ReadingList__Add' onClick={this.onAdd}>
          <i className='mdi mdi-plus-circle' />New paper
        </div>
        {
          papers.toSeq().map(paper => {
            return this.renderPaper(paper);
          })
        }
      </div>
    );
  }

  renderPaper(paper) {
    const onClick = this.onClick.bind(this, paper.get('id'));

    const readingStatus = paper.get('read');
    const classes = {
      mdi: true,
      'mdi-checkbox-blank-circle-outline': readingStatus == null || readingStatus === 0,
      'mdi-checkbox-marked-circle-outline': readingStatus === 1,
      'mdi-dots-horizontal': readingStatus === 2
    };

    const title = (
      paper.get('title') ? paper.get('title') :
      <em className='ReadingList__NoTitle'>No title</em>
    );

    const paperTypeClasses = {
      mdi: true,
      'mdi-file-outline': paper.get('type') === 0,
      'mdi-book-open-page-variant': paper.get('type') === 1,
      'mdi-presentation': paper.get('type') === 2,
      'mdi-cloud-outline': paper.get('type') === 3
    };

    const bookmarkClasses = {
      mdi: true,
      'mdi-bookmark': true
    };

    return (
      <div className='ReadingList__Paper' onClick={onClick} key={paper.get('id')}>
        <div className='ReadingList__PaperRead'><i className={classNames(classes)} /></div>
        <div className='ReadingList__PaperTitle'>{title}</div>
        <div className='ReadingList__Row__Icon'>
          <i className={classNames(bookmarkClasses)} />
        </div>
        <div className='ReadingList__Row__Icon'><i className={classNames(paperTypeClasses)} /></div>
      </div>
    );
  }

  render() {
    const { user } = this.props;

    return (
      <div className='ReadingList'>
        <NavBar
          activeIndex={1}
          username={user.get('name') || ''}
        />
        {this.renderList()}
      </div>
    );
  }
}

export default connect()(ReadingList);

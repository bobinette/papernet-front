import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import classNames from 'classnames';

import { bookmark } from 'actions/user';
import { search } from 'actions/papers';

import NavBar from 'components/navbar';
import Search from 'components/ui/text/search';

import history from 'routing';

import './home.scss';

class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    papers: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.onBookmark = this.onBookmark.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onAdd() {
    history.push('papers/new');
  }

  onClick(id) {
    history.push('papers/' + id);
  }

  onSearch(s) {
    const { dispatch } = this.props;
    dispatch(search(s));
  }

  onBookmark(id) {
    const { dispatch } = this.props;
    dispatch(bookmark(id));
  }

  renderList() {
    const { papers } = this.props;

    return (
      <div className='Home__List'>
        <div className='Home__Add' onClick={this.onAdd}>
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
    const { user } = this.props;

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
      <em className='Home__NoTitle'>No title</em>
    );

    const paperTypeClasses = {
      mdi: true,
      'mdi-file-outline': paper.get('type') === 0,
      'mdi-book-open-page-variant': paper.get('type') === 1,
      'mdi-presentation': paper.get('type') === 2,
      'mdi-cloud-outline': paper.get('type') === 3
    };

    const bookmarks = user.get('bookmarks') || List();
    const index = bookmarks.toSeq().findKey(i => i === paper.get('id'));
    const bookmarked = typeof index !== 'undefined';
    const bookmarkClasses = {
      mdi: true,
      'mdi-bookmark-outline': !bookmarked,
      'mdi-bookmark': bookmarked
    };
    const onBookmark = (event) => {
      event.preventDefault();
      event.stopPropagation();

      this.onBookmark(paper.get('id'));
    };

    return (
      <div className='Home__Paper' onClick={onClick} key={paper.get('id')}>
        <div className='Home__PaperRead'><i className={classNames(classes)} /></div>
        <div className='Home__PaperTitle'>{title}</div>
        <div className='Home__Row__Icon' onClick={onBookmark}>
          <i className={classNames(bookmarkClasses)} />
        </div>
        <div className='Home__Row__Icon'><i className={classNames(paperTypeClasses)} /></div>
      </div>
    );
  }


  render() {
    const { user } = this.props;

    return (
      <div className='Home'>
        <NavBar
          activeIndex={0}
          username={user.get('name') || ''}
        />
        <div className='Home__Search'>
          <Search
            onSearch={this.onSearch}
          />
        </div>
        {this.renderList()}
      </div>
    );
  }
}

export default connect()(Home);

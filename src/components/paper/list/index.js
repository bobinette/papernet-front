import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import classNames from 'classnames';

import { createPaper } from 'actions/paper';
import { search } from 'actions/papers';

import Button from 'components/ui/button';
import Search from 'components/ui/text/search';

import './list.scss';

class PaperList extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    papers: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.onAdd = this.onAdd.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onAdd() {
    const { dispatch } = this.props;
    dispatch(createPaper());
  }

  onClick(id) {
    hashHistory.push('/papers/' + id);
  }

  onSearch(s) {
    const { dispatch } = this.props;
    dispatch(search(s));
  }

  renderHeader() {
    return (
      <div className='PaperList__Header'>
        <h1 className='PaperList__Title'>Papernet</h1>
        <Button
          onClick={this.onAdd}
          content={<i className='mdi mdi-plus'/>}
          type='valid'
        />
      </div>
    );
  }

  renderPaper(paper) {
    const onClick = this.onClick.bind(this, paper.get('id'));

    const classes = {
      mdi: true,
      'mdi-checkbox-marked-circle-outline': paper.get('read'),
      'mdi-checkbox-blank-circle-outline': !paper.get('read'),
    };

    const title = (
      paper.get('title') ? paper.get('title') :
      <em className='PaperList__NoTitle'>No title</em>
    );

    const paperTypeClasses = {
      mdi: true,
      'mdi-file-outline': paper.get('type') === 0,
      'mdi-book-open-page-variant': paper.get('type') === 1,
      'mdi-presentation': paper.get('type') === 2
    };

    return (
      <div className='PaperList__Paper' onClick={onClick} key={paper.get('id')}>
        <div className='PaperList__PaperRead'><i className={classNames(classes)} /></div>
        <div className='PaperList__PaperTitle'>{title}</div>
        <div className='PaperList__PaperType'><i className={classNames(paperTypeClasses)} /></div>
      </div>
    );
  }

  render() {
    const { papers } = this.props;

    return (
      <div className='PaperList'>
        {this.renderHeader()}
        <div className='PaperList__Search'>
          <Search
            onSearch={this.onSearch}
          />
        </div>
        {
          papers.toSeq().map(paper => {
            return this.renderPaper(paper);
          })
        }
      </div>
    );
  }
}

export default connect()(PaperList);

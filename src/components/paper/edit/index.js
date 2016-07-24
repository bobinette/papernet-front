import React, { Component, PropTypes } from 'react';
import { fromJS, List, Map } from 'immutable';
import { Link } from 'react-router';

import { connect } from 'react-redux';

import Button from 'components/ui/button';
import Dropdown from 'components/ui/dropdown';
import NumberInput from 'components/ui/text/number';
import Radio from 'components/ui/radio';
import Select from 'components/ui/select';
import TagList from 'components/ui/tag/list';
import Text from 'components/ui/text';
import TextArea from 'components/ui/textarea';
import TextList from 'components/ui/textlist';

import history from 'routing';

import { deletePaper, savePaper, updatePaper } from 'actions/paper';
import { paperTypes, readingStatuses } from 'constants/paper';

import './edit.scss';

class PaperEdit extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    paper: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.gotoPaper = this.gotoPaper.bind(this);

    this.onAuthorsChange = this.onAuthorsChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onReadChange = this.onReadChange.bind(this);
    this.onRefsChange = this.onRefsChange.bind(this);
    this.onPublishYearChange = this.onPublishYearChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSelectReference = this.onSelectReference.bind(this);
    this.onSummaryChange = this.onSummaryChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onUnselectReference = this.onUnselectReference.bind(this);
    this.onURLsChanged = this.onURLsChanged.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { paper } = this.props;

    if (paper.get('references') !== nextProps.paper.get('references')) {
      const refs = nextProps.paper.get('references');
      this.setState({
        references: refs ? refs.toSeq().map(ref => {
          return ({
            value: ref.get('id'),
            label: ref.get('title')
          });
        }).toList() : List()
      });
    }
  }

  gotoPaper() {
    const { paper } = this.props;
    let addr = 'papers/' + paper.get('id');
    if (typeof paper.get('id') === 'undefined') {
      addr = 'home';
    }

    history.push(addr);
  }

  onAuthorsChange(authors) {
    const { dispatch } = this.props;
    dispatch(updatePaper('authors', authors));
  }

  onDelete() {
    const { dispatch, paper } = this.props;
    dispatch(deletePaper(paper.get('id')));
  }

  onReadChange(read) {
    const { dispatch } = this.props;
    dispatch(updatePaper('read', read.value));
  }

  onRefsChange(refs) {
    const { dispatch } = this.props;
    dispatch(updatePaper('references', refs));
  }

  onPublishYearChange(year) {
    const { dispatch } = this.props;
    dispatch(updatePaper('year', year));
  }

  onSummaryChange(summary) {
    const { dispatch } = this.props;
    dispatch(updatePaper('summary', summary));
  }

  onSave() {
    const { dispatch, paper } = this.props;
    dispatch(savePaper(paper)).then(() => {history.push('papers/' + paper.get('id'));});
  }

  onSelectReference(ref) {
    const { dispatch, paper } = this.props;
    const refs = paper.get('references') ? paper.get('references') : List();
    const index = refs.toSeq().findKey(r => r.get('id') === ref.get('id'));
    if (typeof index !== 'undefined') return;

    dispatch(updatePaper('references', refs.push(Map({
      id: ref.get('id'),
      title: ref.get('title')
    }))));
  }

  onTagsChange(tags) {
    const { dispatch } = this.props;
    dispatch(updatePaper('tags', tags));
  }

  onTitleChange(title) {
    const { dispatch } = this.props;
    dispatch(updatePaper('title', title));
  }

  onTypeChange(type) {
    const { dispatch } = this.props;
    dispatch(updatePaper('type', type.value));
  }

  onUnselectReference(ref) {
    const { dispatch, paper } = this.props;
    const refs = paper.get('references');
    const index = refs.toSeq().findKey(r => r.get('id') === ref.get('id'));
    if (index === -1) return;

    dispatch(updatePaper('references', refs.remove(index)));
  }

  onURLsChanged(urls) {
    const { dispatch } = this.props;
    dispatch(updatePaper('urls', urls));
  }

  renderHeader() {
    return (
      <div className='PaperEdit__Header'>
        <Button
          content={<i className='mdi mdi-close'/>}
          onClick={this.gotoPaper}
        />
        <Button
          content={<i className='mdi mdi-check'/>}
          onClick={this.onSave}
        />
      </div>
    );
  }

  renderFooter() {
    return (
      <div className='PaperEdit__Footer'>
        <Button
          content={<i className='mdi mdi-delete'/>}
          onClick={this.onDelete}
          type='danger'
        />
      </div>
    );
  }

  render() {
    const { paper } = this.props;

    return (
      <div className='PaperEdit'>
        {this.renderHeader()}
        <Text
          className={{ PaperEdit__Block: true }}
          label='Title'
          onChange={this.onTitleChange}
          placeholder='Title...'
          value={paper.get('title')}
        />
        <Radio
          classes={{ PaperEdit__Block: true }}
          label='Read'
          onChange={this.onReadChange}
          options={readingStatuses}
          value={paper.get('read')}
        />
        <NumberInput
          classes={{ PaperEdit__Block: true }}
          label='Release year'
          onChange={this.onPublishYearChange}
          placeholder='ex: 2016...'
          value={paper.get('year')}
        />
        <Radio
          classes={{ PaperEdit__Block: true }}
          label='Type'
          onChange={this.onTypeChange}
          options={paperTypes}
          value={paper.get('type')}
        />
        <TextArea
          className={{ PaperEdit__Block: true, PaperEdit__SummaryField: true }}
          label='Summary'
          onChange={this.onSummaryChange}
          placeholder='Summary...'
          value={paper.get('summary')}
        />
        <TextList
          classes={{ PaperEdit__Block: true }}
          label='Tags'
          onChange={this.onTagsChange}
          placeholder='New tag...'
          values={paper.get('tags') ? paper.get('tags') : List()}
        />
        <TextList
          classes={{ PaperEdit__Block:true }}
          label='Autors'
          onChange={this.onAuthorsChange}
          placeholder='New author...'
          values={paper.get('authors') ? paper.get('authors') : List()}
        />
        <Select
          classes={{ PaperEdit__Block: true }}
          label='References'
          onSelect={this.onSelectReference}
          onUnselect={this.onUnselectReference}
          mapper={(o) => Map(({ value: o.get('id'), label: o.get('title') }))}
          placeholder='This paper references...'
          searchURL='http://localhost:8081/papers'
          value={paper.get('references') ? paper.get('references') : List()}
        />
        <TextList
          classes={{ PaperEdit__Block: true }}
          label='Resources'
          onChange={this.onURLsChanged}
          placeholder='New resource...'
          values={paper.get('urls') ? paper.get('urls') : List()}
        />
        {this.renderFooter()}
      </div>
    );
  }
}

export default connect()(PaperEdit);

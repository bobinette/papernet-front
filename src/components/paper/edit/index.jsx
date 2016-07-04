import React, { Component, PropTypes } from 'react';
import { Link} from 'react-router';

import { connect } from 'react-redux';

import Text from '../../../components/ui/text';
import TextArea from '../../../components/ui/textarea';
import TextList from '../../../components/ui/textlist';

import { deletePaper, savePaper, updatePaper } from '../../../actions/paper';

import './edit.scss';

class PaperEdit extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    paper: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.onAuthorsChange = this.onAuthorsChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onRefsChange = this.onRefsChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSummaryChange = this.onSummaryChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
  }

  onAuthorsChange(authors) {
    const { dispatch } = this.props;
    dispatch(updatePaper('authors', authors));
  }

  onDelete() {
    const { dispatch, paper } = this.props;
    dispatch(deletePaper(paper.get('id')));
  }

  onRefsChange(refs) {
    const { dispatch } = this.props;
    dispatch(updatePaper('references', refs));
  }

  onSummaryChange(summary) {
    const { dispatch } = this.props;
    dispatch(updatePaper('summary', summary));
  }

  onSave() {
    const { dispatch, paper } = this.props;
    dispatch(savePaper(paper));
  }

  onTagsChange(tags) {
    const { dispatch } = this.props;
    dispatch(updatePaper('tags', tags));
  }

  onTitleChange(title) {
    const { dispatch } = this.props;
    dispatch(updatePaper('title', title));
  }

  renderHeader(paper) {
    return (
      <div className='PaperEdit__Header'>
        <Link to={`/papers/${paper.get('id')}`} className='PaperEdit__Button'>
          <i className='mdi mdi-close' />
        </Link>
        <div className='PaperEdit__Button'><i className='mdi mdi-check' onClick={this.onSave} /></div>
      </div>
    );
  }

  renderFooter() {
    return (
      <div className='PaperEdit__Footer'>
        <div className='PaperEdit__Button--danger' onClick={this.onDelete}>
          <i className='mdi mdi-delete' />
        </div>
      </div>
    );
  }

  render() {
    const { paper } = this.props;

    return (
      <div className='PaperEdit'>
        {this.renderHeader(paper)}
        <h1 className='PaperEdit__Title'>{paper.get('title')} - Edit</h1>
        <Text
          className={{ PaperEdit__TitleField: true }}
          label='Title'
          onChange={this.onTitleChange}
          placeholder='Title...'
          value={paper.get('title')}
        />
        <TextArea
          className={{ PaperEdit__SummaryField: true }}
          label='Summary'
          onChange={this.onSummaryChange}
          placeholder='Summary...'
          value={paper.get('summary')}
        />
        <TextList
          label='Tags'
          onChange={this.onTagsChange}
          placeholder='New tag...'
          values={paper.get('tags')}
        />
        <TextList
          label='Autors'
          onChange={this.onAuthorsChange}
          placeholder='New author...'
          values={paper.get('authors')}
        />
        <TextList
          label='References'
          onChange={this.onRefsChange}
          placeholder='This paper references...'
          values={paper.get('references')}
        />
        {this.renderFooter()}
      </div>
    );
  }
}

export default connect()(PaperEdit);

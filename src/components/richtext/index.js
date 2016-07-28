import React, { Component, PropTypes } from 'react';

import classNames from 'classnames';

import katex from 'katex';
import sanitize from 'sanitize-caja';

import Markdown from 'react-remarkable';

import TextArea from 'components/ui/textarea';

import './richtext.scss';

class RichText extends Component {
  static propTypes = {
    classes: PropTypes.object,
    onChange: PropTypes.func,
    editable: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired
  }

  static defaultProps = {
    classes: {},
    editable: false,
    onChange: () => {},
    placeholder: ''
  };

  constructor(props) {
    super(props);

    this.setEditMode = this.changeMode.bind(this, true);
    this.setViewMode = this.changeMode.bind(this, false);

    this.state = {
      editMode: true
    };
  }

  componentDidMount() {
    this.rerenderLatex();
  }

  componentDidUpdate() {
    this.rerenderLatex();
  }

  changeMode(editMode) {
    console.log(editMode)
    this.setState({ editMode });
  }

  rerenderLatex() {
    const elts = document.getElementsByClassName('math');
    Array.prototype.forEach.call(elts, function(elt) {
      // Do stuff here
      katex.render(elt.innerHTML, elt, { displayMode: true });
    });
  }

  renderEdit() {
    const { onChange, placeholder, value } = this.props;
    return (
      <TextArea
        classes={{ RichText__TextArea: true }}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    );
  }

  renderMarkdown() {
    const { value } = this.props;

    const mathSource = value.replace(
      '<eq>', '<div class="math">'
    ).replace('</eq>', '</div>');

    return (
      <div className='RichText__View'>
        <Markdown
          source={sanitize(mathSource)}
          options={{ html: true }}
        />
        <div className='RichText__Extender' />
      </div>
    );
  }

  renderFooter(editMode) {
    const viewClasses = {
      RichText__FooterTab: true,
      'RichText__FooterTab--active': !editMode
    };

    const editClasses = {
      RichText__FooterTab: true,
      'RichText__FooterTab--active': editMode
    };

    return (
      <div className='RichText__Content RichText__Footer'>
        <div className='RichText__FooterTabs'>
          <div className={classNames(viewClasses)} onClick={this.setViewMode}>View</div>
          <div className={classNames(editClasses)} onClick={this.setEditMode}>Edit</div>
        </div>
      </div>
    );
  }

  render() {
    const { classes, editable } = this.props;
    const { editMode } = this.state;

    classes.RichText = true;
    classes['RichText--extend'] = editable;

    return (
      <div className={classNames(classes)}>
        <div className='RichText__Content RichText__Source'>
          {editable && editMode ? this.renderEdit() : this.renderMarkdown()}
        </div>
        {editable ? this.renderFooter(editMode) : null}
      </div>
    );
  }
}

export default RichText;

import React, { PureComponent } from 'react';
import { List } from 'immutable';

import moment from 'moment';

import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

import TagList from 'components/taglist';

import { paperPropType } from 'utils/constants';

import './row.scss';

const extractAbstract = (text) => {
  let end = text.indexOf('#');
  if (end === -1) {
    end = text.length;
  }

  return text.substring(0, end);
};

const abstractLength = 200;

class ImportRow extends PureComponent {
  static propTypes = {
    paper: paperPropType.isRequired,
  };

  constructor(props) {
    super(props);

    this.onShow = ::this.onShow;

    this.state = {
      fullAbstract: false,
    };
  }

  onShow() {
    const { fullAbstract } = this.state;
    this.setState({ fullAbstract: !fullAbstract });
  }

  renderAbstract() {
    const { paper } = this.props;
    const { fullAbstract } = this.state;

    let abstract = extractAbstract(paper.get('summary'));
    if (!abstract) return null;

    if (!fullAbstract && abstract && abstract.length > abstractLength) {
      abstract = `${abstract.substring(0, abstractLength - 3)}...`;
    }

    return (
      <div className="card-text">
        {abstract}<br />
        <button className="btn btn-sm btn-link" onClick={this.onShow}>
          Show {fullAbstract ? 'less' : 'more'}
        </button>
      </div>
    );
  }

  render() {
    const { paper } = this.props;

    const tags = paper.get('tags') || List();

    return (
      <div className="ImportRow card">
        <div className="card-block">
          <h5 className="card-title">{paper.get('title')}</h5>
          {this.renderAbstract()}
          <div className="card-text ImportRow__Links">
            <a href={paper.getIn(['references', 0])} className="btn btn-sm btn-outline-primary">See on arXiv</a>
            <a href={paper.getIn(['references', 1])} className="btn btn-sm btn-outline-primary">PDF</a>
          </div>
          <p className="card-text">
            <small
              className="text-muted"
              data-for={paper.get('id').toString()}
              data-tip
            >
              <Tooltip
                placement="bottom"
                mouseEnterDelay={0.3}
                overlay={<small>{moment(paper.get('updatedAt')).format('LLL')}</small>}
              >
                <span>Modified {moment(paper.get('updatedAt')).fromNow()}</span>
              </Tooltip>
            </small>
          </p>
        </div>
        <div className="card-footer">
          <div className="ImportRow__Tags">
            <i className="fa fa-tag" />
            <TagList tags={tags} max={5} />
          </div>
        </div>
      </div>
    );
  }
}


export default ImportRow;

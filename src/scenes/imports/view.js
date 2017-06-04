import PropTypes from 'prop-types';
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import classNames from 'classnames';

import { paperPropType } from 'utils/constants';

import FileLoader from './components/file-loader';
import ImportViewRow from './components/row';

import './view.scss';

const ImportView = ({ loading, imported, onImport, papers }) => {
  const btnClassName = classNames(
    'btn',
    { 'btn-primary': !loading, disabled: loading || imported },
  );

  let btnText = 'Import all papers';
  if (loading) btnText = 'Importing...';
  else if (imported) btnText = 'Done';

  let btnIcon = null;
  if (loading) btnIcon = (<i className="ImportView__ButtonIcon fa fa-circle-o-notch fa-spin fa-3x fa-fw" />);
  else if (imported) btnIcon = (<i className="ImportView__ButtonIcon fa fa-check" />);

  return (
    <div className="ImportView">
      <div className="ImportView__Input">
        <div className="ImportView__Input__Help">
          Import your Google Chrome Bookmarks as Papers
          <br /><small className="text-sm">(Help:&nbsp;
          <a
            href="http://www.wikihow.com/Export-Bookmarks-from-Chrome"
            target="_blank"
            rel="noopener noreferrer"
          >
            Export Chrome bookmarks to file
          </a>)</small>
        </div>
        <FileLoader />
      </div>
      {papers && papers.size > 0 &&
        <div className="ImportView__List">
          <div className="ImportView__ImportButton">
            <button className={btnClassName} onClick={loading ? null : onImport}>
              {btnText}
              {btnIcon}
            </button>
          </div>
          <ul>{
              papers.map(paper => (
                <li key={paper.get('title')}>
                  <ImportViewRow paper={paper} />
                </li>
              ))
          }</ul>
        </div>
      }
    </div>
  );
};

ImportView.propTypes = {
  loading: PropTypes.bool.isRequired,
  imported: PropTypes.bool.isRequired,
  onImport: PropTypes.func.isRequired,
  papers: ImmutablePropTypes.listOf(paperPropType).isRequired,
};

export default ImportView;

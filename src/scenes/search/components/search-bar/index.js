import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classNames from 'classnames';

import Text from 'components/input/text';

import { SEARCH_GO, SEARCH_UPDATE_Q } from '../../api/constants';

import './search-bar.scss';

const mapDispatchToProps = dispatch => ({
  onChange: q => dispatch({ type: SEARCH_UPDATE_Q, q }),
  onSearch: q => dispatch({ type: SEARCH_GO, q, limit: 0, offset: 0, sources: null }),
});

const mapStateToProps = state => ({
  q: state.search.get('q'),
});

class SearchBar extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    q: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.onKeyPress = ::this.onKeyPress;
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onSearch(this.props.q);
    }
  }

  render() {
    const { q, onChange } = this.props;

    return (
      <div className="container SearchScene__SearchBar">
        <div className="col-md-10 offset-md-1">
          <div className="SearchBar">
            <Text
              className="SearchBar__Input"
              onChange={onChange}
              onKeyPress={this.onKeyPress}
              placeholder={'Search...'}
              value={q}
            />
            <i className={classNames('fa', { 'fa-search': !q, 'fa-level-down fa-rotate-90': q })} />
          </div>
          <div
            className={classNames('text-muted SearchScene__SearchBar__Help', {
              'SearchScene__SearchBar__Help--show': q,
            })}
          >
            <small>
              Press enter to search &#124;
              <button className="btn btn-sm btn-link" onClick={() => console.log(q)}>
                Save as cron
              </button>
            </small>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

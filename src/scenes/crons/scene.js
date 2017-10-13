import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ImmutablePropTypes from 'react-immutable-proptypes';

import NavBar from 'components/navbar';

import TextInput from 'components/input/text';

import CronRow from './components/row';

import { CRONS_CREATE, CRONS_FETCH } from './api/constants';

import './scene.scss';

const mapDispatchToProps = dispatch => ({
  createCron: (q, sources) => dispatch({ type: CRONS_CREATE, q, sources }),
  fetchCrons: () => dispatch({ type: CRONS_FETCH }),
});

const mapStateToProps = state => ({
  crons: state.crons.get('crons'),
});

class CronsScene extends PureComponent {
  static propTypes = {
    createCron: PropTypes.func.isRequired,
    crons: ImmutablePropTypes.list.isRequired,
    fetchCrons: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);

    this.state = { newSearch: '' };
  }

  componentDidMount() {
    this.props.fetchCrons();
  }

  onChange(newSearch) {
    this.setState({ newSearch });
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      const { newSearch } = this.state;
      this.props.createCron(newSearch, ['arxiv']);
      this.setState({ newSearch: '' });
    }
  }

  render() {
    const { crons } = this.props;
    const { newSearch } = this.state;

    return (
      <div>
        <NavBar />
        <div className="CronsScene__List container">
          <div className="col-md-10 offset-md-1">
            <ul>
              {crons &&
                crons.map(cron => (
                  <li key={cron.get('id')}>
                    <CronRow cron={cron} />
                  </li>
                ))}
            </ul>
            <TextInput
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
              placeholder="New search query..."
              value={newSearch}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CronsScene);

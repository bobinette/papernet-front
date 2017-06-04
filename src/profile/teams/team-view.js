import PropTypes from 'prop-types';
import React, { Component } from 'react';

import TextInput from 'components/input/text';

import { userPropType } from 'utils/constants';
import { teamPropType } from './constants';

class TeamView extends Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    onInvite: PropTypes.func.isRequired,
    onKick: PropTypes.func.isRequired,
    team: teamPropType.isRequired,
    user: userPropType.isRequired,
  };

  constructor(props) {
    super(props);

    this.onChange = ::this.onChange;
    this.onKeyPress = ::this.onKeyPress;

    const userID = props.user.get('id');
    const admin = props.team.get('members').find(m => m.get('id') === userID).get('admin');
    this.state = { admin, email: '' };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user || nextProps.team !== this.props.team) {
      const userID = nextProps.user.get('id');
      const admin = nextProps.team.get('members').find(m => m.get('id') === userID).get('admin');
      this.setState({ admin });
    }
  }

  onChange(text) {
    this.setState({ email: text });
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onInvite(this.props.team.get('id'), this.state.email);
      this.setState({ email: '' });
    }
  }

  onKick(userID) {
    const { onKick, team } = this.props;
    return () => onKick(team.get('id'), userID);
  }

  render() {
    const { team } = this.props;
    const { admin, email } = this.state;

    return (
      <div className="TeamView">
        <h5 className="TeamView__Name">
          {team.get('name')}
          {admin &&
            <button
              className="btn btn-link TeamView__DeleteButton"
              onClick={() => this.props.onDelete(team.get('id'))}
            >
              <i className="fa fa-trash" />
            </button>
          }
        </h5>
        <ul className="list-group">
          {
            team.get('members').map(m => (
              <li className="list-group-item TeamView__Member" key={m.get('id')}>
                {m.get('name')}
                <span>
                  {
                    m.get('admin') && <span className="tag tag-primary tag-pill">admin</span>
                  }
                  {admin &&
                    <button className="btn btn-link" onClick={this.onKick(m.get('id'))}>
                      <i className="fa fa-trash" />
                    </button>
                  }
                </span>
              </li>
            )).toJS()
          }
          {
            admin &&
            <li className="list-group-item">
              <TextInput
                onChange={this.onChange}
                onKeyPress={this.onKeyPress}
                placeholder="enter email to invite a new member..."
                value={email}
              />
              <small className="TeamView__InviteText text-muted">
                <strong>Note:</strong> We do not send email, you need to warn that person yourself before inving
                him/her if he/she is not on the Papernet yet.
              </small>
            </li>
          }
        </ul>
      </div>
    );
  }
}

export default TeamView;

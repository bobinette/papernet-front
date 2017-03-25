import React, { Component, PropTypes } from 'react';

import TextInput from 'components/input/text';

import { userPropType } from 'utils/constants';
import { teamPropType } from './constants';

class TeamView extends Component {
  static propTypes = {
    onInvite: PropTypes.func.isRequired,
    onKick: PropTypes.func.isRequired,
    team: teamPropType,
    user: userPropType,
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
      const admin = nextProps.team.get('members').find(m => m.get('id') === userID);
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
      <div>
        <h5 className="ProfileViewTeam__Name">{team.get('name')}</h5>
        <ul className="list-group">
          {
            team.get('members').map(m => (
              <li className="list-group-item ProfileViewTeam__Member" key={m.get('id')}>
                {m.get('name')}
                <span>
                  {
                    m.get('admin') && <span className="tag tag-primary tag-pill">admin</span>
                  }
                  <button className="btn btn-link" onClick={this.onKick(m.get('id'))}>
                    <i className="fa fa-trash" />
                  </button>
                </span>
              </li>
            )).toJS()
          }
          {
            admin &&
            <li className="list-group-item">
              <TextInput
                placeholder="enter email to invite a new member..."
                onChange={this.onChange}
                onKeyPress={this.onKeyPress}
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

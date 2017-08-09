import { fromJS, Map } from 'immutable';

import { TOKEN_RECEIVE, USER_RECEIVE, USER_SIGN_OUT } from './constants';
import reducer from './reducer';

describe('auth reducer', () => {
  it('should update token', () => {
    const newState = reducer(Map(), { type: TOKEN_RECEIVE, token: 'Pizza' });
    expect(newState).toEqual(fromJS({
      token: { token: 'Pizza', loaded: true },
    }));
  });

  it('should update user', () => {
    const newState = reducer(Map(), { type: USER_RECEIVE, user: { id: 1, name: 'Anakin' } });
    expect(newState).toEqual(fromJS({
      user: { id: 1, name: 'Anakin' },
    }));
  });

  it('should remove all user details on signout', () => {
    const expectedState = fromJS({
      user: {
        id: 0,
        name: '',
        email: '',
        bookmarks: [],
        canSee: [],
      },
      token: {
        loaded: true, // token is loaded, there just isn't any
        token: '',
      },
    });

    const newState = reducer(Map(), { type: USER_SIGN_OUT });
    expect(newState).toEqual(expectedState);
  });
});

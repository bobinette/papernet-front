import { expectSaga } from 'redux-saga-test-plan';
import cookie from 'react-cookie';

import { loadCookie, saveCookie } from './cookie';
import { TOKEN_RECEIVE, TOKEN_COOKIE_LOADED } from '../constants';

jest.mock('react-cookie', () => ({
  load: jest.fn(),
  save: jest.fn(),
}));

describe('cookie saga', () => {
  it('should load cookie', () => {
    cookie.load.mockImplementationOnce((name, doNotParse) => {
      expect(name).toEqual('access_token');
      expect(doNotParse).toEqual(true);
      return 'pizza.yolo';
    });

    return expectSaga(loadCookie)
      .put({ type: TOKEN_RECEIVE, token: 'pizza.yolo' })
      .run();
  });

  it('should not send TOKEN_RECEIVE when no cookie', () => {
    cookie.load.mockImplementationOnce((name, doNotParse) => {
      expect(name).toEqual('access_token');
      expect(doNotParse).toEqual(true);
      return undefined;
    });

    return expectSaga(loadCookie)
      .not.put({ type: TOKEN_RECEIVE, token: undefined })
      .put({ type: TOKEN_COOKIE_LOADED })
      .run();
  });

  it('should save cookie', () => {
    cookie.save.mockImplementationOnce((name, token, options) => {
      expect(name).toEqual('access_token');
      expect(token).toEqual('pizza.yolo');
      expect(options).toEqual({ path: '/' });
    });

    return expectSaga(saveCookie, { token: 'pizza.yolo' })
      .run();
  });
});

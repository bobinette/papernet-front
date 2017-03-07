import React from 'react';
import { fromJS } from 'immutable';

import { mount } from 'enzyme';
import { expect } from 'chai';
import proxyquire from 'proxyquire';
import sinon from 'sinon';

const dispatch = sinon.spy();
const login = sinon.spy();
const logout = sinon.spy();

const createStore = user => ({
  dispatch,
  getState: () => ({
    user: fromJS(user),
  }),
  subscribe: () => {},
});

describe('<NavBar />', () => {
  let NavBar;

  before(() => {
    NavBar = proxyquire('src/components/navbar', {
      'auth/actions': { login, logout },
    }).default;
  });

  it('should have the login button when no user, and call onLogin when clicked', () => {
    const comp = mount(<NavBar
      store={createStore({})}
    />);

    const dropdown = comp.find('.NavBar__DropDown');
    expect(dropdown).to.not.be.present();
    const button = comp.find('.NavBar__LoginButton');
    expect(button).to.be.present();

    button.simulate('click');
    expect(dispatch.called).to.be.true();
    expect(login.called).to.be.true();
    expect(logout.called).to.be.false();
  });

  it('should have the dropdown when there is a user', () => {
    const comp = mount(<NavBar
      store={createStore({ token: 'abc' })}
    />);

    const dropdown = comp.find('.NavBar__DropDown');
    expect(dropdown).to.be.present();
    const button = comp.find('.NavBar__LoginButton');
    expect(button).to.not.be.present();
  });
});

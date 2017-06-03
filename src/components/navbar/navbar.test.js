import React from 'react';
import { fromJS } from 'immutable';

import { mount } from 'enzyme';

import { NavBar } from './navbar';

const onLogin = jest.fn();
const onLogout = jest.fn();

test('No user: should render the login button', () => {
  onLogin.mockReset();
  onLogout.mockReset();

  const user = fromJS({
    user: {},
    token: { loaded: true, token: '' },
  });

  const comp = mount(
    <NavBar
      onLogin={onLogin}
      onLogout={onLogout}
      user={user}
    />
  );

  const dropdown = comp.find('.NavBar__DropDown');
  expect(dropdown.length).toEqual(0);
  const button = comp.find('.NavBar__LoginButton');
  expect(button.length).toEqual(1);

  button.simulate('click');
  expect(onLogin).toBeCalled();
  expect(onLogout).not.toBeCalled();
});

test('With user: should render the dropdown', () => {
  onLogin.mockReset();
  onLogout.mockReset();

  const user = fromJS({
    user: { name: 'Test', email: 'test@test.com' },
    token: { loaded: true, token: 'abcd' },
  });

  const comp = mount(
    <NavBar
      onLogin={onLogin}
      onLogout={onLogout}
      user={user}
    />
  );

  const button = comp.find('.NavBar__LoginButton');
  expect(button.length).toEqual(0);

  const dropdown = comp.find('.NavBar__DropDown');
  expect(dropdown.length).toEqual(1);
});

import React from 'react';
import { fromJS } from 'immutable';
import renderer from 'react-test-renderer';

import { mount } from 'enzyme';

import { NavBar } from './navbar';

test('Render children', () => {
  const onLogin = jest.fn();
  const onLogout = jest.fn();

  const user = fromJS({
    user: {},
    token: { loaded: true, token: '' },
  });

  const navbar = renderer.create(
    <NavBar
      onLogin={onLogin}
      onLogout={onLogout}
      user={user}
    >
      <div className="test">This is a test</div>
      <a className="link" href="there">Zelda</a>
    </NavBar>,
  );

  const tree = navbar.toJSON();
  expect(tree).toMatchSnapshot();
});

test('No user: should render the login button', () => {
  const onLogin = jest.fn();
  const onLogout = jest.fn();

  const user = fromJS({
    user: {},
    token: { loaded: true, token: '' },
  });

  const navbar = mount(
    <NavBar
      onLogin={onLogin}
      onLogout={onLogout}
      user={user}
    />,
  );

  const dropdown = navbar.find('.NavBar__DropDown');
  expect(dropdown.length).toEqual(0);
  const button = navbar.find('.NavBar__LoginButton');
  expect(button.length).toEqual(1);

  button.simulate('click');
  expect(onLogin).toBeCalled();
  expect(onLogout).not.toBeCalled();
});

test('With user: should render the dropdown', () => {
  const onLogin = jest.fn();
  const onLogout = jest.fn();

  const user = fromJS({
    user: { name: 'Test', email: 'test@test.com' },
    token: { loaded: true, token: 'abcd' },
  });

  const navbar = mount(
    <NavBar
      onLogin={onLogin}
      onLogout={onLogout}
      user={user}
    />,
  );

  const button = navbar.find('.NavBar__LoginButton');
  expect(button.length).toEqual(0);

  const dropdown = navbar.find('.NavBar__DropDown');
  expect(dropdown.length).toEqual(1);
});

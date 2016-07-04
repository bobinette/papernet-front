import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRedirect, Router, Route, hashHistory } from 'react-router';

import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import paper from '../src/reducers/paper';
import papers from '../src/reducers/papers';

import ShowContainer from './containers/show';
import EditContainer from './containers/edit';
import ListContainer from './containers/list';

import 'bootstrap/dist/css/bootstrap.css';
import 'mdi/scss/materialdesignicons.scss';

import './style/base.scss';

const store = createStore(
  combineReducers({
    paper,
    papers
  }),
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/'>
        <IndexRedirect to='/papers' />
        <Route path='papers' component={ListContainer} />
        <Route path='papers/:paperId' component={ShowContainer} />
        <Route path='papers/:paperId/edit' component={EditContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

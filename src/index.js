import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRedirect, Router, Route } from 'react-router';

import history from 'routing';

// Redux
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

// Toastr
import {reducer as toastrReducer} from 'react-redux-toastr';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/src/less/index.less';

import 'katex/dist/katex.min.css';

// Containers
import CreateContainer from 'containers/create';
import EditContainer from 'containers/edit';

import HomeContainer from 'home/container';
import PaperContainer from 'paper/container';
import ReadingListContainer from 'readinglist/container';
import UserLogin from 'login';

// Reducers
import paper from 'reducers/paper';
import papers from 'reducers/papers';
import user from 'reducers/user';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import 'mdi/scss/materialdesignicons.scss';
import './style/base.scss';

const reducers = {
  paper,
  papers,
  user,
  toastr: toastrReducer
};
const reducer = combineReducers(reducers);

const middlewares = compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducer, middlewares);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        position='top-right'
      />
      <Router history={history}>
        <Route path='/'>
          <IndexRedirect to='/papers' />
          <Route path='papers' component={HomeContainer} />
          <Route path='login' component={UserLogin} />
          <Route path='papers/new' component={CreateContainer} />
          <Route path='papers/:paperId' component={PaperContainer} />
          <Route path='papers/:paperId/edit' component={EditContainer} />
          <Route path='readinglist' component={ReadingListContainer} />
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
);

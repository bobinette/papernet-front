import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRedirect, Router, Route } from 'react-router';

import history from 'routing';

// Redux
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';


// Paper page
import PaperContainer from 'paper/container';
import paperReducer from 'paper/reducer';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import 'mdi/scss/materialdesignicons.scss';
import 'katex/dist/katex.min.css';
import 'style/base.scss';

// Create store
const reducers = {
  paper: paperReducer,
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
      <Router history={history}>
        <Route path="/">
          <IndexRedirect to="/papers" />
          <Route path="papers/:id" component={PaperContainer} />
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
);

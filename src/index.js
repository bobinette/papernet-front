import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRedirect, Router, Route } from 'react-router';

import history from 'routing';

// Redux
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

// Paper list page
import PaperListContainer from 'paperlist/container';
import paperListReducer from 'paperlist/reducer';

// Paper page
import PaperViewContainer from 'paper/view/container';
import PaperEditContainer from 'paper/edit/container';
import paperReducer from 'paper/reducer';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import 'mdi/scss/materialdesignicons.scss';
import 'katex/dist/katex.min.css';
import 'style/base.scss';

// Create store
const reducers = {
  paper: paperReducer,
  paperList: paperListReducer,
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
          <Route path="papers" component={PaperListContainer} />
          <Route path="papers/new" component={PaperEditContainer} />
          <Route path="papers/:id" component={PaperViewContainer} />
          <Route path="papers/:id/edit" component={PaperEditContainer} />
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
);

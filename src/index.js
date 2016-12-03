import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRedirect, Router, Route, browserHistory } from 'react-router';

// import history from 'routing';

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

// Auth page
import GoogleLoggedIn from 'auth/google';
import userReducer from 'auth/reducer';

// Styles
import 'style/base.scss';
import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';
import 'katex/dist/katex.min.css';

// Create store
const reducers = {
  paper: paperReducer,
  paperList: paperListReducer,
  user: userReducer,
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
      <Router history={browserHistory}>
        <Route path="/">
          <IndexRedirect to="/papers" />
          <Route path="papers" component={PaperListContainer} />
          <Route path="papers/new" component={PaperEditContainer} />
          <Route path="papers/:id" component={PaperViewContainer} />
          <Route path="papers/:id/edit" component={PaperEditContainer} />
          <Route path="auth">
            <IndexRedirect to="/auth/google" />
            <Route path="google" component={GoogleLoggedIn} />
          </Route>
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
);

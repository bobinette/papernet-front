import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRedirect, Router, Route, browserHistory } from 'react-router';

// Redux
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

// Toastr
import ReduxToastr, { reducer as toastrReducer } from 'react-redux-toastr';

// Init style before importing components
import 'style/base.scss';
import 'font-awesome/scss/font-awesome.scss';
import 'katex/dist/katex.min.css';
import 'react-redux-toastr/src/styles/index.scss';
import 'style/toastr.scss';

// Paper list page
import HomeContainer from 'home/container';
import homeReducer from 'home/reducer';

// Paper page
import PaperViewContainer from 'paper/view/container';
import PaperEditContainer from 'paper/edit/container';
import paperReducer from 'paper/reducer';

// Auth page
import GoogleLoggedIn from 'auth/google';
import userReducer from 'auth/reducer';

// Imports
import ImportContainer from 'imports/container';
import importsReducer from 'imports/reducer';

// Create store
const reducers = {
  home: homeReducer,
  imports: importsReducer,
  paper: paperReducer,
  toastr: toastrReducer,
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
          <Route path="papers" component={HomeContainer} />
          <Route path="papers/new" component={PaperEditContainer} />
          <Route path="papers/:id" component={PaperViewContainer} />
          <Route path="papers/:id/edit" component={PaperEditContainer} />
          <Route path="auth">
            <IndexRedirect to="/auth/google" />
            <Route path="google" component={GoogleLoggedIn} />
          </Route>
          <Route path="imports" component={ImportContainer} />
        </Route>
      </Router>
      <ReduxToastr
        newestOnTop
        preventDuplicates
        timeOut={0}
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />
    </div>
  </Provider>,
  document.getElementById('app')
);

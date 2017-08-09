import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRedirect, IndexRoute, Router, Route, browserHistory } from 'react-router';

// Redux
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

// Toastr
import ReduxToastr, { reducer as toastrReducer } from 'react-redux-toastr';

// Init style before importing components
import 'style/base.scss';
import 'font-awesome/scss/font-awesome.scss';
import 'katex/dist/katex.min.css';
import 'react-redux-toastr/src/styles/index.scss';
import 'style/toastr.scss';

// App wrapper
import App from 'app';

// Paper list page
// import HomeContainer, { homeReducer } from 'home';

// Paper page
import { PaperEditContainer, PaperViewContainer, paperReducer } from 'paper';

// Profile page
import { ProfileContainer, profileReducer } from 'profile';

// Privacy policy
import { Privacy, TermsOfUse } from 'legal';

// Components
import Footer from 'components/footer';

// Scenes
import HomeContainer, { homeReducer } from 'scenes/home';
import ImportContainer, { importsReducer } from 'scenes/imports';
import LoginContainer, { GoogleLogin, loginReducer } from 'scenes/login';
import SearchScene, { searchReducer } from 'scenes/search';

// Reducers
import authReducer from 'services/auth/reducer';

// Sagas
import rootSaga from 'sagas';

// Create store
const reducers = {
  auth: authReducer,
  home: homeReducer,
  imports: importsReducer,
  login: loginReducer,
  paper: paperReducer,
  profile: profileReducer,
  search: searchReducer,
  toastr: toastrReducer,
};
const reducer = combineReducers(reducers);
const sagaMiddleware = createSagaMiddleware();
const middlewares = compose(
  applyMiddleware(thunkMiddleware),
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);
const store = createStore(reducer, middlewares);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App>
      <div className="Router">
        <Router history={browserHistory}>
          <Route path="/">
            <IndexRedirect to="/papers" />
            <Route path="papers" component={HomeContainer} />
            <Route path="papers/new" component={PaperEditContainer} />
            <Route path="papers/:id" component={PaperViewContainer} />
            <Route path="papers/:id/edit" component={PaperEditContainer} />
            <Route path="login">
              <IndexRoute component={LoginContainer} />
              <Route path="google" component={GoogleLogin} />
            </Route>
            <Route path="search" component={SearchScene} />
            <Route path="imports" component={ImportContainer} />
            <Route path="privacy" component={Privacy} />
            <Route path="terms-of-use" component={TermsOfUse} />
            <Route path="profile" component={ProfileContainer} />
          </Route>
        </Router>
      </div>
      <Footer />

      <ReduxToastr
        newestOnTop
        preventDuplicates
        timeOut={5000}
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />
    </App>
  </Provider>,
  document.getElementById('app'),
);

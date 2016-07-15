import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRedirect, Router, Route, hashHistory } from 'react-router';

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
import ShowContainer from 'containers/show';
import EditContainer from 'containers/edit';
import ListContainer from 'containers/list';

// Reducers
import paper from 'reducers/paper';
import papers from 'reducers/papers';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import 'mdi/scss/materialdesignicons.scss';
import './style/base.scss';

const reducers = {
  paper,
  papers,
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
      <Router history={hashHistory}>
        <Route path='/'>
          <IndexRedirect to='/papers' />
          <Route path='papers' component={ListContainer} />
          <Route path='papers/:paperId' component={ShowContainer} />
          <Route path='papers/:paperId/edit' component={EditContainer} />
        </Route>
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
);

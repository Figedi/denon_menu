// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Config from './containers/Config';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/config" component={Config} />
  </Route>
);

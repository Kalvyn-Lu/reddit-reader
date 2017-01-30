import React from 'react';
import {Route, IndexRoute} from 'react-router';
//Components
import {Layout} from './components/Layout.jsx';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={Layout} />
  </Route>
);

export default routes;

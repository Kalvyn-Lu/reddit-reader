import React from 'react';
import {Route, IndexRoute} from 'react-router';
//Components
import Layout from './components/Layout.jsx';
import Login from './components/Login.jsx';

const routes = (
  <Route path="/" component={Layout}>
  	<IndexRoute component={Login}/>
  </Route>
);

export default routes;

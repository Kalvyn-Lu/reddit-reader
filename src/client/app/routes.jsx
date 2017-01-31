import React from 'react';
import {Route, IndexRoute} from 'react-router';
//Components
import Layout from './components/Layout.jsx';
import Login from './components/Login.jsx';
import {Account} from './account.jsx';

var account = new Account();

const routes = (
  <Route path="/" component={Layout}>
  	<IndexRoute account={account}  component={Login}/>
  </Route>
);

export default routes;

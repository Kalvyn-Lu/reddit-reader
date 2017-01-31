import React from 'react';
import {Route, IndexRoute, withRouter} from 'react-router';
//Components
import Layout from './components/Layout.jsx';
import Login from './components/Login.jsx';
import Reader from './components/Reader.jsx'; 

import {Account} from './account.jsx';

var account = new Account();

const routes = (
  <Route path="/" component={Layout}>
  	<IndexRoute account={account}  component={withRouter(Login)}/>
  	<Route path="reader/:sub" account={account} component={Reader} />
  </Route>
);

export default routes;

import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import Main from './containers/Main/Main';
import Login from './containers/Login/Login';
import Signup from './containers/Login/Signup/Signup';
import Cart from '../src/containers/Cart/Cart';
import MyAccount from '../src/containers/Account/Account'
import Dashboard from '../src/containers/Dashboard/Dashboard'

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider>
          <div className="App">
            <Switch>
              <Route path="/" exact render={ () => (
                <Redirect to="/main" />
              ) } />
              <Route path="/cart" component={ Cart } />
              <Route path="/MyAccount" component={ MyAccount } />
              <Route path="/main" component={ Main } />
              <Route path="/signup" component={ Signup } />
              <Route path="/dashboard" component={ Dashboard } />
              <Route render={ () => <Redirect to="/main" /> } />
            </Switch>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;

import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Form from './components/Form';

const RouterComponent = () => {
    return (
      <Router>
        <Scene key="app">
              <Scene key="login" component={LoginForm} title="login"  hideNavBar/>
              <Scene key="dashboard" component={Dashboard} title="dashboard" hideNavBar/>
              <Scene key="cotizar_new" component={Form} title="form" hideNavBar/>
        </Scene>
      </Router>
    );
  };

  export default RouterComponent;
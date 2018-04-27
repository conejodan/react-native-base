import React from 'react';
import {Router, Scene} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Formulario from './components/Formulario';
import MapView from './components/MapView';

const RouterComponent = () => {
    return (
      <Router>
        <Scene key="app">
              <Scene key="mapview" component={MapView} title="mapview" hideNavBar/>
              <Scene key="login" component={LoginForm} title="login"  hideNavBar/>
              <Scene key="dashboard" component={Dashboard} title="dashboard" hideNavBar/>
              <Scene key="formulario" component={Formulario} title="formulario" hideNavBar/>
              
        </Scene>
      </Router>
    );
  };

  export default RouterComponent;
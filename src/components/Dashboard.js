import React, {Component} from 'react';
//import {StatusBar} from 'react-native';
import { Icon, Button } from 'native-base';
import {Actions} from 'react-native-router-flux';
import DrawerItem from './common/DrawerItem';

class Dashboard extends Component{

rightMenu(){
      return (
          
        <Button
              transparent
              onPress={() => Actions.push('form')}>
              <Icon name="md-add-circle" />
            </Button>
          
      );
    
  }

    render(){
        return(
            <DrawerItem title="Dashboard" rightMenu={this.rightMenu()}>
              
      </DrawerItem>
        );
    }
}

export default Dashboard;
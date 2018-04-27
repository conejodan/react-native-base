import React, { Component } from 'react';
import {
  Text
} from 'react-native';
//import {StatusBar} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {Content, List, ListItem} from 'native-base';

export default class Sidebar extends Component {
  render() {
    return (
        <Content style={{backgroundColor:'#F0F0F0', paddingTop:20}}>
        <List>
            <ListItem button onPress={() => Actions.push('dashboard')}>
              <Text>Inicio</Text>
            </ListItem>
            <ListItem button onPress={() => Actions.push('formulario')}>
              <Text>Form</Text>
            </ListItem>
            <ListItem button onPress={() => Actions.push('mapview')}>
              <Text>Map</Text>
            </ListItem>
            <ListItem button onPress={() => Actions.push('login')}>
              <Text>Salir</Text>
            </ListItem>
          </List>
      </Content>
    );
  }
}
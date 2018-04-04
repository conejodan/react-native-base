import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import {StatusBar} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {Content, List, ListItem, Body} from 'native-base';

export default class Sidebar extends Component {
  render() {
    return (
        <Content style={{backgroundColor:'#FFFFFF',marginTop: StatusBar.currentHeight}}>
        <List>
            <ListItem>
              <Text>Inicio</Text>
            </ListItem>
            <ListItem button onPress={() => Actions.push('login')}>
              <Text>Salir</Text>
            </ListItem>
          </List>
      </Content>
    );
  }
}
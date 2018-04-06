import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import { Container, Header,Right,Left,Icon, Body, Title, Content, Button, Text, List, ListItem } from 'native-base';
import {Actions} from 'react-native-router-flux';
import DrawerItem from './common/DrawerItem';

class Dashboard extends Component{

    render(){
        return(
            <DrawerItem title="Dashboard">
              
      </DrawerItem>
        );
    }
}

export default Dashboard;
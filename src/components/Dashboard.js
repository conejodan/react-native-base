import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import { Container,Drawer, Header,Right,Left,Icon, Body, Title, Content, Button, Text, List, ListItem } from 'native-base';
import {Actions} from 'react-native-router-flux';
import SideBar from './sidebar';

class Dashboard extends Component{

  onPressButton(){
    Actions.push('login');
  }
  
  sendForm(){
    Actions.push('form');
  }
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

    render(){
        return(
          <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={
          <SideBar />
      }
        onClose={() => this.closeDrawer()} >
      <Container style={{ marginTop: StatusBar.currentHeight}}>
        <Header>
        <Left>
            <Button
              transparent
              onPress={() => this.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
        <Body>
          <Title>Dashboard</Title>
        </Body>
        <Right>
        <Button
              transparent
              onPress={() => this.sendForm()}>
              <Icon name="md-add-circle" />
            </Button>
          </Right>
      </Header>
      <Content>
        </Content>
      </Container>
      </Drawer>
            
        );
    }
}

export default Dashboard;
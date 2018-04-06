import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import { Container,Drawer, Header,Right,Left,Icon, Body, Title, Content, Button, Text, List, ListItem } from 'native-base';
import {Actions} from 'react-native-router-flux';
import SideBar from './sidebar';

class DrawerItem extends Component{

  constructor(props) {
    super(props);
    console.log("props", props);
  }

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

  menuContent(){
    
  }

  leftMenu(){
    console.log("BackStep")
    if(this.props.backstep){
      console.log("backstep",true)
      return (
        <Left>
            <Button
              transparent
              onPress={() => Actions.pop()}>
              <Icon name="menu" />
            </Button>
          </Left>
              );
    }else{
      console.log("backstep",false)
      return (
<Left>
            <Button
              transparent
              onPress={() => this.openDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
      );
    }
  }

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
        {this.leftMenu()}
        <Body>
          <Title>{this.props.title}</Title>
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
        {this.props.children}
        </Content>
      </Container>
      </Drawer>
            
        );
    }
}

export default DrawerItem;
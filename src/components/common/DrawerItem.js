import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import {
  Container,
  Drawer,
  Header,
  Right,
  Left,
  Icon,
  Body,
  Title,
  Content,
  Button,
} from 'native-base';
//import {Actions} from 'react-native-router-flux';
import SideBar from './sidebar';

class DrawerItem extends Component {
  constructor(props) {
    super(props);
    console.log('props', props);
  }

  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };

  leftMenu() {
    var menu_icon = 'menu';
    var menu_route = () => this.openDrawer();
    if (this.props.menu_route) {
      menu_route = this.props.menu_route;
    }
    if (this.props.menu_icon) {
      menu_icon = this.props.menu_icon;
    }

    return (
      <Left>
        <Button transparent onPress={menu_route}>
          <Icon name={menu_icon} />
        </Button>
      </Left>
    );
  }

  rightMenuitem() {
    if (this.props.rightMenu) {
      return (
        this.props.rightMenu
        );
    }
  }

  render() {
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<SideBar />}
        onClose={() => this.closeDrawer()}>
        <Container style={{ marginTop: StatusBar.currentHeight }}>
          <Header>
            {this.leftMenu()}
            <Body>
              <Title>{this.props.title}</Title>
            </Body>
            <Right>
        {this.rightMenuitem()}
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

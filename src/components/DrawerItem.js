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
  Button
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

  render() {
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<SideBar />}
        onClose={() => this.closeDrawer()}>
        {this.props.childen}
      </Drawer>
    );
  }
}

export default DrawerItem;

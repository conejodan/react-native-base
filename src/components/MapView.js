import React, {Component} from 'react';
import {Drawer, Icon, Button, Container, Header, Body, Left, Right, Title, Content } from 'native-base';
import { View, Text } from 'native-base';
import SideBar from './sidebar';
import {StatusBar} from 'react-native';

class MapView extends Component{

    constructor(props) {
        super(props);
        console.log("props", props);
      }

    closeDrawer = () => {
        this.drawer._root.close();
      };
      openDrawer = () => {
        this.drawer._root.open();
      };


    render(){
        return(
          <Drawer
          ref={ref => {
            this.drawer = ref;
          }}
          content={<SideBar />}
          onClose={() => this.closeDrawer()}>
              
        <Container style={{ marginTop: StatusBar.currentHeight }}>
          <Header>
          <Left>
          <Button transparent onPress={this.openDrawer}>
                    <Icon name={"menu"} />
                  </Button>
          </Left>
            <Body>
              <Title>Dashboard</Title>
            </Body>
            <Right>
        </Right>
          </Header>
          <Content style={{padding:6, paddingBottom:20}} padder>
            
          </Content>
        </Container>
      </Drawer>
        );
    }
}

export default MapView;
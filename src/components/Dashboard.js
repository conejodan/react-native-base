import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {Drawer, Icon, Button, Container, Header, Body, Left, Right, Title, Content } from 'native-base';
import {Actions} from 'react-native-router-flux';
//import Drawer from './DrawerItem';
import SideBar from './sidebar';

class Dashboard extends Component{

    constructor(props) {
        super(props);
        console.log("props", props);
        this.state = {
          field1: "",
          field2: "",
          field3: "",
          field4: "",
          field4_list: []
        };
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
            <Button
              transparent
              onPress={() => Actions.push('formulario')}>
              <Icon name="md-add-circle" />
            </Button>
        </Right>
          </Header>
          <Content style={{padding:6, paddingBottom:20}} padder>
            
          </Content>
        </Container>
      </Drawer>
        );
    }
}

export default Dashboard;
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {StatusBar} from 'react-native';
//import DrawerItem from './DrawerItem';
import {Drawer,Container,Header, Card, CardItem,Left,Title, Text, Item, Label,Body, Input, Picker, Content, Form, Button, Icon, List, ListItem, Right } from 'native-base';
import SideBar from './sidebar';

class Formulario extends Component {

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

  changeField(prop, text) {
    this.setState({ [prop]: text });
  }

  onValueChange(value) {
    console.log("Seleccionando", value);
  }

  onPressButton(){
    this.setState({
      field4_list: this.state.field4_list.concat(this.state.field4),
      field4: ""
    });
  }

  deleteRow(index){
    this.setState({
      field4_list: this.state.field4_list.filter((_, i) => i !== index)
    });
  }

  listItems(){
    const row = this.state.field4_list.map((val, index)=>(
      <ListItem key={index}>
      <Body>
      <Text>{index} - {val}</Text>
        </Body>
        <Right>
        <Button transparent onPress={()=> this.deleteRow(index)} >
        <Icon name='ios-close-circle-outline' />
        </Button>
        </Right>
              
            </ListItem>
    ));
    return (
      <List style={{flex:1}}>
        {row}
        </List>
    );
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
              
              <Container style={{ marginTop: StatusBar.currentHeight }}>
                <Header>
                <Left>
                  <Button transparent onPress={this.openDrawer}>
                    <Icon name={"menu"} />
                  </Button>
                </Left>
                  <Body>
                    <Title>Form</Title>
                  </Body>
                  <Right>
              </Right>
                </Header>
                <Content style={{padding:6, paddingBottom:20}} padder>
                <Card style={{flex:1}}> 
          <CardItem header>
            <Text>Formulario</Text>
          </CardItem>
          <CardItem>
            <Item floatingLabel>
              <Label>Field 1 - {this.state.field1}</Label>
              <Input
                onChangeText={value => this.changeField('field1', value)}
                value={this.state.field1}
              />
            </Item>
          </CardItem>
          <CardItem>
            <Item floatingLabel>
              <Label>Field 2 - {this.state.field2}</Label>
              <Input
                onChangeText={value => this.changeField('field2', value)}
                autoCorrect={false}
                secureTextEntry={true}
                value={this.state.field2}
              />
            </Item>
          </CardItem>
          <CardItem>

            <Content>
              <Form>
                <Label>Field 3 - Select</Label>
                <Picker
                  iosHeader={"Select one"}
                  placeholder="Field 3 - Select"
                  mode="dropdown"
                  selectedValue={this.state.field3}
                  onValueChange={(value)=>this.changeField('field3', value)}
                >
                  <Picker.Item label="Wallet" value="0" />
                  <Picker.Item label="ATM Card" value="1" />
                  <Picker.Item label="Debit Card" value="2" />
                  <Picker.Item label="Credit Card" value="3" />
                  <Picker.Item label="Net Banking" value="4" />
                </Picker>
              </Form>
            </Content>

          </CardItem>
          
          <CardItem>
            <Item floatingLabel style={{flex:1}}>
              <Label>Field 4 - {this.state.field4}</Label>
              <Input
                onChangeText={value => this.changeField('field4', value)}
                value={this.state.field4}
              />
            </Item>
            <Button transparent onPress={this.onPressButton.bind(this)} >
            <Icon name='ios-add-circle' />
          </Button>
          </CardItem>
          
          <CardItem>
          
          </CardItem>
        </Card>
                </Content>
              </Container>
            </Drawer>
    );
  }
}
export default Formulario;
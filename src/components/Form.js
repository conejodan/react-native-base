import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import DrawerItem from './common/DrawerItem';
import { Card, CardItem, Text, Item, Label,Body, Input, Picker, Content, Form, Button, Icon, List, ListItem, Right } from 'native-base';
class Cotizar_Create extends Component {

  constructor(props) {
    super(props);
    console.log("props", props);
    this.state = {
      field1: "",
      field2: "",
      field3_value: "",
      field3: []
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
      field3: this.state.field3.concat(this.state.field3_value),
      field3_value: ""
    });
  }

  deleteRow(index){
    this.setState({
      field3: this.state.field3.filter((_, i) => i !== index)
    });
  }

  listItems(){
    const row = this.state.field3.map((val, index)=>(
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

  render() {

    return (
      <DrawerItem title="Formulario" menu_icon="ios-arrow-back" menu_route={() => Actions.push('dashboard')}>
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
                  onValueChange={this.onValueChange.bind(this)}

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
              <Label>Field 2 - {this.state.field3_value}</Label>
              <Input
                onChangeText={value => this.changeField('field3_value', value)}
                value={this.state.field3_value}
              />
            </Item>
            <Button transparent onPress={this.onPressButton.bind(this)} >
            <Icon name='ios-add-circle' />
          </Button>
          </CardItem>
          
          <CardItem>
          {this.listItems()}
          </CardItem>
        </Card>
      </DrawerItem>
    );
  }
}
export default Cotizar_Create
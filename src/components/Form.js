import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import DrawerItem from './common/DrawerItem';
import {Card, CardItem, Text, Item, Label, Input, Picker, Content, Form} from 'native-base';
class Cotizar_Create extends Component{
  
  constructor(props) {
    super(props);
    console.log("props", props);
    this.state ={
      field1 : "",
      field2 : "",
      field3 : null
    };
  }

  changeField(prop,text){
    this.setState({[prop] : text});
  }

  onValueChange(value){
    console.log("Seleccionando", value);
  }

  render(){
    
    return(
      <DrawerItem title="Formulario" menu_icon="ios-arrow-back" menu_route={()=> Actions.push('dashboard')}>
              <Card>
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
              </CardItem>
              </Card>
      </DrawerItem>
        );
  }
}
export default Cotizar_Create
import React, {Component} from 'react';
import {Actions} from 'react-native-router-flux';
import DrawerItem from './common/DrawerItem';
import {Card, CardItem, Text, Item, Label, Input} from 'native-base';
class Cotizar_Create extends Component{
  
  constructor(props) {
    super(props);
    console.log("props", props);
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
              <Label>Correo</Label>
              <Input
              />
            </Item>
            </CardItem>
              </Card>
      </DrawerItem>
        );
  }
}
export default Cotizar_Create
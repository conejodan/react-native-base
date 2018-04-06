import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {Container, Header,Body,Title,Content,Button,Text} from 'native-base';
import {Actions} from 'react-native-router-flux';
import DrawerItem from './common/DrawerItem';

class Cotizar_Create extends Component{
  
  constructor(props) {
    super(props);
    console.log("props", props);
  }

  onPressButton(){
    Actions.push('dashboard');
  }
  
  render(){
    
    return(
      <DrawerItem title="Formulario" backstep>
              
      </DrawerItem>
        );
  }
}
export default Cotizar_Create
import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import {Container, Header,Body,Title,Content,Button,Text} from 'native-base';
import {Actions} from 'react-native-router-flux';

class Cotizar_Create extends Component{
  
  onPressButton(){
    Actions.push('dashboard');
  }
  
  render(){
    
    return(
            <Container style={{ marginTop: StatusBar.currentHeight}}>
        <Header>
        <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
          <Title>Formulario</Title>
        </Body>
      </Header>
      <Content>
          
            <Button block onPress={this.onPressButton.bind(this)}>
            <Text>Salir</Text>
          </Button>
        </Content>
      </Container>
        );
  }
}
export default Cotizar_Create
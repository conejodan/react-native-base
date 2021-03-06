import React, { Component } from 'react';
import { StatusBar, View } from 'react-native';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Label,
  Card,
  CardItem
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { emailChanged, passwordChange, loginUser } from '../actions';

class LoginForm extends Component {

  componentWillMount(){
    console.log("Cargando LoginForm");
    console.log(this.props.user);
    if(this.props.user){
      Actions.push('dashboard');  
    }
  }

  onPressButton() {
    Actions.push('dashboard');
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }
  onPasswordChange(text) {
    this.props.passwordChange(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Text>Cargando</Text>;
    }  
    return (
      <Button block onPress={this.onPressButton.bind(this)} style={{flex:1}}>
        <Text>Ingresar</Text>
      </Button>
    );
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  render() {
    return (
      <Container style={{ marginTop: StatusBar.currentHeight }}>
        <Header>
          <Body
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Title>Login</Title>
          </Body>
        </Header>
        <Content style={{padding:5}}>
        <Card>
          <Form>
            <Item floatingLabel>
              <Label>Correo</Label>
              <Input
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
              />
            </Item>
            <CardItem>
            {this.renderButton()}
            </CardItem>
            {this.renderError()}
          </Form>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
};

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChange,
  loginUser,
})(LoginForm);

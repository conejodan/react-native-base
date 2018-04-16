//import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';

import React, {Component} from 'react';
import {View,Text} from 'react-native';
import Application from './src/Application';
import {Spinner} from 'native-base';

export default class App extends Component {
  state = {loaded:false};

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });
    const that = this;
    setTimeout(function(){
      that.setState({loaded:true});
    },3000);
    
  }

  render() {
    if(!this.state.loaded){
      return <View style={{flex:1, justifyContent:'center', alignItems:'center', flexDirection:'column'}}><Spinner color="blue"/><Text style={{fontSize: 20,fontWeight: 'bold'}}>Cargando...</Text></View>
    }
    return (
       <Application/>
    );
  }
}
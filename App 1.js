//import React from 'react';
//import { StyleSheet, Text, View } from 'react-native';

import React, {Component} from 'react';
import {View,Text} from 'react-native';
import Application from './src/Application';

export default class App extends Component {
  state = {loaded:false};

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });
    this.setState({loaded:true});
  }

  render() {
    if(!this.state.loaded){
      return <View><Text>Loading</Text></View>
    }
    return (
       <Application/>
    );
  }
}
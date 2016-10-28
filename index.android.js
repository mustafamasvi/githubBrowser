/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import * as Progress from 'react-native-progress';

var Login = require('./Login');
var authService = require('./AuthService');
export default class AwesomeProject extends Component {
      constructor(props){
        super(props);
        this.state = {
          isLoggedIn: false,
          checkingAuth: true
        }
      }

      componentDidMount() {
        authService.getAuthInfo((err,authInfo)=>{
          this.setState({
            checkingAuth: false,
            isLoggedIn: authInfo != null
          })
        });
      }

      onLogin=()=> {
        this.setState({isLoggedIn: true});
      }
  render() {
    if(this.state.checkingAuth){
      return (
           <View style = {styles.container}>
           <Progress.CircleSnail animating={true} hidesWhenStopped={!this.state.checkingAuth} size= {50} color={['red', 'green', 'blue']} />
           </View>
        );
    }
    if(this.state.isLoggedIn){
      return (
          <View style = {styles.container}>
            <Text style = {styles.welcome}> Welcome</Text>
          </View>
        );
    } else {
    return (
         <Login onLogin={this.onLogin} />
    );}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);

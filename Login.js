'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import * as Progress from 'react-native-progress';


export default class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			showProgress: false
		};
	}

	render() {
		var errorCrlr = <View />;
		if(!this.state.success && this.state.badCredentials){
			errorCrlr = <Text style = {styles.error}> Username and Password didn't Match </Text>;
		}

		if(!this.state.success && this.state.unknownError){
		errorCrlr = <Text style = {styles.error}> Something went wrong </Text>;
		}

		return (
			<ScrollView keyboardShouldPersistTaps={false} style= {styles.Scrollcontainer}>
			<View style= {styles.container}> 
			<Image style = {styles.logo} source = {require('./images/octocat.png')}/>
			<Text style = {styles.heading}>Git Browser</Text>
			<TextInput style= 
			{styles.input} 
			placeholder= "UserName or Email"
			onChangeText = {(text)=> this.setState({username: text})} />
			<TextInput style= {styles.input} placeholder= "Password" secureTextEntry={true}
			onChangeText = {(text)=>this.setState({password: text})} /*ios true in quotes*/ />
			<TouchableHighlight style = {styles.button} onPress={this.onLoginPressed.bind(this)}>
			<Text style = {styles.buttonText}>Log in</Text>
			</TouchableHighlight>
			{errorCrlr}
			<Progress.CircleSnail style={styles.loader} animating={this.state.showProgress} hidesWhenStopped={!this.state.showProgress} size= {50} color={['red', 'green', 'blue']} />	
			</View>
			</ScrollView>
		);
	}

	onLoginPressed(){

		console.log('Attempting to login ' + this.state.username + ' ' + this.state.password );
		this.setState({showProgress: true});

		var authService = require('./AuthService');
		authService.login({
			username: this.state.username,
			password: this.state.password
		}, (results)=> {
				this.setState(Object.assign({showProgress: false}, results));
				if(results.success && this.props.onLogin){
					this.props.onLogin();
				}
		});
	}
}

var width = Dimensions.get('window').width; 

const styles = StyleSheet.create({
	Scrollcontainer: {
		paddingTop: 40,
		backgroundColor: '#d0d3d8',
	},
	container: {
		flex: 1,
		alignItems: 'center'
	},
	logo: {
		height : 55,
		width: 65
	},
	heading : {
		marginTop: 10,
		fontSize: 30
	},
	input: {
		width: width* 0.9,
		alignSelf:'center',
		height: 50,
		marginTop: 10,
		padding: 10,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#48bbec',
		paddingBottom: 0
	},
	button: {
		height : 50,
		backgroundColor : '#7ea5e5',
		width: width* 0.9,
		marginTop: 10,
		justifyContent: 'center',
	},
	buttonText: {
		fontSize: 22,
		color: '#FFF',
		alignSelf: 'center'
	},
	loader: {
		marginTop: 10
	},
	error : {
		marginTop: 10,
		color: 'red',
		fontSize: 12
	}
});

module.exports = Login;
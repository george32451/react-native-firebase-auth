import React from 'react';
import { StyleSheet, View, TextInput, Text, Button, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    onChangeEmail = (text) => {
        this.setState({
            email: text,
        })
    }

    onChangePassword = (text) => {
        this.setState({
            password: text,
        })
    }

    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => {
                Alert.alert(error.message);
            })
    }

    onCreateAccountPress = () => {
        this.props.navigation.navigate('Signup');
    }

    onForgotPasswordPress = () => {
        this.props.navigation.navigate('ForgotPassword');
    }

    render() {
        return (
            <View style={{paddingTop: 50, alignItems: 'center'}}>

                <Text>Вход</Text>

                <TextInput style = { {width: 200, height: 40, borderWidth: 1} }
                           value = { this.state.email }
                           onChangeText = { this.onChangeEmail }
                           placeholder = 'Email'
                           keyboardType = 'email-address'
                           autoCapitalize = 'none'
                           autoCorrect = {false}
                />

                <View style = { { padding:5 } }/>

                <TextInput style = { {width: 200, height: 40, borderWidth: 1} }
                           value = { this.state.password }
                           onChangeText = { this.onChangePassword }
                           placeholder = 'Password'
                           secureTextEntry={true}
                           autoCorrect = {false}
                />

                <View style = { { padding:5 } }/>

                <Button title = 'Login' onPress = { this.onLoginPress }/>

                <View style = { { padding:5 } }/>

                <Button title = 'Create account' onPress = { this.onCreateAccountPress }/>

                <View style = { { padding:5 } }/>

                <Button title = 'Forgot password?' onPress = { this.onForgotPasswordPress }/>
            </View>
        );
    }
}

const styles = StyleSheet.create({

})
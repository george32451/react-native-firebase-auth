import React from 'react';
import {StyleSheet, View, Text, TextInput, Button, Alert} from 'react-native';
import * as firebase from 'firebase'
export default class SignupScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirm: '',
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

    onChangePasswordConfirm = (text) => {
        this.setState({
            passwordConfirm: text,
        })
    }

    onSignupPress = () => {
        if(this.state.password !== this.state.passwordConfirm) {
            Alert.alert('Пароли не совпадают');
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => {
                Alert.alert(error.message);
            });
    }

    onBackToLoginPress = () => {
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View style={{paddingTop: 50, alignItems: 'center'}}>

                <Text>Регистрация</Text>

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

                <TextInput style = { {width: 200, height: 40, borderWidth: 1} }
                           value = { this.state.passwordConfirm }
                           onChangeText = { this.onChangePasswordConfirm }
                           placeholder = 'Confirm password'
                           secureTextEntry={true}
                           autoCorrect = {false}
                />

                <View style = { { padding:5 } }/>

                <Button title = 'Signup' onPress = { this.onSignupPress }/>

                <View style = { { padding:5 } }/>

                <Button title = 'Back to login' onPress = { this.onBackToLoginPress }/>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})
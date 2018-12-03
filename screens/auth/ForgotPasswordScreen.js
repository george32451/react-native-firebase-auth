import React from 'react';
import { View, Text, TextInput, Button, Alert} from 'react-native';
import * as firebase from 'firebase';

export default class ForgotPasswordScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
        };
    }
    onChangeEmail = (text) => {
        this.setState({
            email: text,
        })
    }

    onResetPasswordPress = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                Alert.alert(`Письмо со сбросом пароля отправлено ${this.state.email}`);
                this.props.navigation.navigate('Login');
            }, (error) => {
                Alert.alert(error.message);
            });
    }

    onBackToLoginPress = () => {
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View style={{paddingTop: 50, alignItems: 'center'}}>

                <Text>Забыли пароль?</Text>

                <TextInput style = { {width: 200, height: 40, borderWidth: 1} }
                           value = { this.state.email }
                           onChangeText = { this.onChangeEmail }
                           placeholder = 'Email'
                           keyboardType = 'email-address'
                           autoCapitalize = 'none'
                           autoCorrect = {false}
                />

                <View style = { { padding:5 } }/>

                <Button title = 'Reset password' onPress = { this.onResetPasswordPress }/>

                <View style = { { padding:5 } }/>

                <Button title = 'Back to login' onPress = { this.onBackToLoginPress }/>
            </View>
        )
    }
}

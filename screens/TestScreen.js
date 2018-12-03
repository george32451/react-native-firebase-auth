import React from 'react';
import { Text, View, Button, } from 'react-native';
import * as firebase from 'firebase'

import { TestComponent } from '../components/AppComponents'

export default class TestScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    onSignOutPress = () => {
        firebase.auth().signOut();
    }

    render() {
        const user = firebase.auth().currentUser;
        return (
            <View style={{paddingTop: 30, alignItems: 'center'}}>
                <Text>Здравствуйте!</Text>
                <TestComponent user={user}/>
                <View style={{padding: 5}}/>
                <Button title = 'Выйти' onPress={this.onSignOutPress}/>
            </View>
        )
    }
}



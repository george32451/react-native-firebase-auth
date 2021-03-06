import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import MainTabNavigator from './navigation/MainTabNavigator'
import ApiKeys from './constants/ApiKeys';
import * as firebase from 'firebase';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        isLoadingComplete: false,
        isAuthenticationReady: false,
        isAuthenticated: false,
    };

    //Initialize firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig)
    }
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user) => {
    this.setState({
        isAuthenticationReady: true,
        isAuthenticated: !!user,
    })
  }

  render() {
    if ((!this.state.isLoadingComplete || !this.state.isAuthenticationReady) && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          { this.state.isAuthenticated ? <MainTabNavigator/> : <AppNavigator />}
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

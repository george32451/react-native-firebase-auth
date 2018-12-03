import React from 'react';
import { Text, View, Button, Alert, } from 'react-native';
import { FileSystem, MediaLibrary, Permissions } from 'expo'

async function requestWriteExternalStoragePermission() {
    try{
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    } catch (e) {
        console.warn(e)
    }
}

async function saveToGallery (uri) {
    try  {
        const asset = await MediaLibrary.createAssetAsync(uri);
        Alert.alert('Файл сохранен в: ', asset.uri)
    } catch (e) {
        console.warn(e)
    }
}

export default class TestComponent extends React.Component {

    downloadFile() {
        FileSystem.downloadAsync(
            'http://techslides.com/demos/sample-videos/small.mp4',
            FileSystem.documentDirectory + 'small.mp4'
        )
            .then( ({ uri }) => {
                saveToGallery(uri);
            })
            .catch(error => {
                console.error(error);
            });
    }

    onDownloadPress = () => {
        requestWriteExternalStoragePermission()
            .then(() =>
                {
                    this.downloadFile()
                },
                (error) => {
                    Alert.alert(error.message)
                })
    }

    render() {
        const { user } = this.props;
        let email;
        if (user !== null) {
            email = user.email;
        }
        return (
            <View>
                <Text>Вы вошли под логином {email.split('@')[0]}</Text>
                <Button title = 'Загрузить' onPress={this.onDownloadPress}/>
            </View>
        )
    }
}
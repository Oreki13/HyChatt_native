import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Button,
  Image,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import {Header, Left, Right, Body, Title} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-community/async-storage';
import geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import firebase from '../firebase/index';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      address: '',
      name: '',
      status: '',
      image: '',
      id: '',
    };

    geolocation.getCurrentPosition(info => {
      this.setState({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      });
    });
  }
  componentDidMount = async () => {
    const uid = await AsyncStorage.getItem('uid');
    let pos = {
      lat: this.state.latitude,
      lng: this.state.longitude,
    };

    await firebase
      .database()
      .ref(`user/${uid}`)
      .once('value')
      .then(data => {
        this.setState({
          id: uid,
          name: data.val().name,
          status: data.val().status,
          image: data.val().image,
        });
      });
    Geocoder.geocodePosition(pos).then(res => {
      this.setState({
        address: res[0].formattedAddress,
      });
    });
  };
  Logout = async () => {
    const userId = await AsyncStorage.getItem('uid');
    firebase
      .database()
      .ref(`/user/${userId}`)
      .update({status: 'offline'});
    let keys = ['uid', 'name', 'image'];
    await AsyncStorage.multiRemove(keys, error => {
      this.props.navigation.navigate('Login');
    });
  };

  imagePic = async () => {
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;
    console.log('LOGGANN', Blob, fs);

    const options = {
      title: 'Select Image',

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ])
      .then(result => {
        if (
          result['android.permission.CAMERA'] === 'granted' &&
          result['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
          result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
        ) {
          ImagePicker.showImagePicker(options, response => {
            let uploadBob = null;
            const imageRef = firebase.storage().ref(`profile/${this.state.id}`);
            fs.readFile(response.path, 'base64')
              .then(data => {
                return Blob.build(data, {type: `${response.mime};BASE64`});
              })
              .then(blob => {
                uploadBob = blob;
                return imageRef.put(blob, {contentType: `${response.mime}`});
              })
              .then(() => {
                uploadBob.close();
                return imageRef.getDownloadURL();
              })
              .then(async url => {
                firebase
                  .database()
                  .ref(`user/${this.state.id}`)
                  .update({image: url});
                this.setState({image: url}).catch(err => console.log(err));
              });
          });
        } else if (
          result['android.permission.CAMERA'] === 'denied' &&
          result['android.permission.READ_EXTERNAL_STORAGE'] === 'denied' &&
          result['android.permission.WRITE_EXTERNAL_STORAGE'] === 'denied'
        ) {
          ToastAndroid.show(
            'Allow Permission to Continue',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        }
      })
      .catch(err => console.log(err));
    // ImagePicker.showImagePicker(options, response => {
    //   console.log('Response = ', response);

    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else if (response.customButton) {
    //     console.log('User tapped custom button: ', response.customButton);
    //   } else {
    //     const source = {uri: response.uri};

    //     this.setState({
    //       avatarSource: source,
    //     });
    //   }
    // });
  };

  render() {
    // var pos = {
    //   lat: this.state.latitude,
    //   lng: this.state.longitude,
    // };

    // Geocoder.geocodePosition(pos).then(res => {
    //   this.setState({
    //     address: res[0].formattedAddress,
    //   });
    // });
    console.log(this.state);

    return (
      <Fragment>
        <Header style={{backgroundColor: '#4287f5'}}>
          <Left>
            <TouchableOpacity
              style={styles.backAr}
              onPress={() => this.props.navigation.goBack()}>
              <FontAwesomeIcon style={{color: 'white'}} icon={faArrowLeft} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={styles.title}>Profile</Title>
          </Body>
          <Right />
        </Header>
        <View style={styles.container}>
          <View style={styles.head}>
            <Image style={styles.image} source={{uri: this.state.image}} />
            <Text style={styles.nameDat}>{this.state.name}</Text>
          </View>

          <Text style={styles.adres}>Alamat :{this.state.address}</Text>
          <View style={styles.btn}>
            <Button
              title="Upload Image"
              color="green"
              onPress={this.imagePic}
            />
          </View>
        </View>
        <View style={{marginBottom: 15, marginHorizontal: 50}}>
          <Button title="Logout" color="red" onPress={this.Logout} />
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  head: {
    backgroundColor: '#4287f5',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
  },
  head2: {
    backgroundColor: '#4287f5',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
  },
  image: {
    width: '35%',
    height: '57%',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'white',
    color: 'white',
  },
  header: {
    flexDirection: 'row',
  },
  backAr: {
    paddingLeft: 10,
  },
  title: {
    fontSize: 19,
  },
  nameDat: {
    fontSize: 17,
    color: 'white',
  },
  adres: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  btn: {
    marginHorizontal: 100,
    borderRadius: 15,
  },
});

export default Profile;

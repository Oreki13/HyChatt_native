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
} from 'react-native';
import {Header, Left, Right, Body, Title} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-community/async-storage';
import geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import firebase from '../firebase/index';

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

    await firebase
      .database()
      .ref(`user/${uid}`)
      .once('value')
      .then(data => {
        this.setState({
          name: data.val().name,
          status: data.val().status,
          image: data.val().image,
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

  render() {
    var pos = {
      lat: this.state.latitude,
      lng: this.state.longitude,
    };

    Geocoder.geocodePosition(pos).then(res => {
      this.setState({
        address: res[0].formattedAddress,
      });
    });

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
            <Button title="Logout" color="red" onPress={this.Logout} />
          </View>
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
    marginHorizontal: 50,
  },
});

export default Profile;

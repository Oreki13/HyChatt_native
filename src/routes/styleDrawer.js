import React, {Component, Fragment} from 'react';
import {View, Text, Image, TouchableHighlight, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserFriends, faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '../firebase/index';

class StyleDrawer extends Component {
  state = {name: '', images: ''};
  componentDidMount = async () => {
    const uid = await AsyncStorage.getItem('uid');
    firebase
      .database()
      .ref(`user/${uid}`)
      .once('value')
      .then(data =>
        this.setState({images: data.val().image, name: data.val().name}),
      );
  };
  render() {
    return (
      <Fragment>
        <View style={styles.header}>
          <Image
            style={styles.img}
            source={{
              uri: this.state.images,
            }}
          />
          <Text>{this.state.name}</Text>
        </View>

        <TouchableHighlight
          underlayColor={'#bad2f5'}
          onPress={() => {
            this.props.navigation.navigate('Maps');
          }}>
          <View style={styles.row}>
            <FontAwesomeIcon icon={faMapMarkedAlt} />
            <Text style={{marginLeft: 10}}>Maps</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor={'#bad2f5'}
          onPress={() => {
            this.props.navigation.navigate('Profile');
          }}>
          <View style={styles.row}>
            <FontAwesomeIcon icon={faUserFriends} />
            <Text style={{marginLeft: 10}}>Profile</Text>
          </View>
        </TouchableHighlight>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingLeft: 10,
  },
  header: {
    width: '100%',
    height: 170,
    backgroundColor: '#4287f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    color: 'black',
    height: 70,
    width: 70,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StyleDrawer;

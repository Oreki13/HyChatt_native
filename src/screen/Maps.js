import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import {Header, Left, Right, Button, Body, Title} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import geolocation from '@react-native-community/geolocation';

class Maps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapRegion: null,
      lastLat: 0,
      lastLong: 0,
      users: [],
    };
  }

  componentDidMount = async () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(() => {
      geolocation.getCurrentPosition(
        position => {
          let region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.00922 * 1.5,
            longitudeDelta: 0.00421 * 1.5,
          };
          this.onRegionChange(region, region.latitude, region.longitude);
        },
        error => console.log(error),
      );
    });
  };

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong,
    });
  }

  render() {
    console.log(this.state);

    return (
      <Fragment>
        <Header>
          <Left>
            <TouchableOpacity
              style={styles.backAr}
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}>
              <FontAwesomeIcon style={{color: 'white'}} icon={faArrowLeft} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title style={styles.title}>Maps</Title>
          </Body>
          <Right />
        </Header>
        <View>
          <MapView
            style={{width: '100%', height: '100%'}}
            region={this.state.mapRegion}>
            <Marker
              coordinate={{
                latitude: this.state.lastLat,
                longitude: this.state.lastLong,
              }}></Marker>
          </MapView>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
  },
  backAr: {
    paddingLeft: 10,
  },
  title: {
    fontSize: 19,
  },
});

export default Maps;

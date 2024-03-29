import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import {Header, Left, Right, Fab, Title, Body, Spinner} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars, faAddressBook} from '@fortawesome/free-solid-svg-icons';
import geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '../firebase/index';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      data: [],
      naem: 0,
      newFilter: [],
      idUser: '',
      isLoading: true,
    };
    this.getLocation();
    this.updateLocation();
  }

  getLocation = async () => {
    geolocation.getCurrentPosition(info => {
      this.setState({
        latitude: info.coords.latitude,
        longtitude: info.coords.longitude,
      });
    });
  };

  updateLocation = async () => {
    AsyncStorage.getItem('uid', (error, result) => {
      if (result) {
        if (this.state.latitude) {
          firebase
            .database()
            .ref(`user/${result}`)
            .update({
              latitude: this.state.latitude,
              longtitude: this.state.longtitude,
            });
        }
      }
    });
  };

  componentDidMount = async () => {
    await AsyncStorage.getItem('uid').then(result => {
      if (result) {
        this.setState({uid: result});
      }
    });
    firebase
      .database()
      .ref('user')
      .on('child_added', data => {
        let person = data.val();
        person.id = data.key;
        if (person.id !== this.state.uid) {
          this.setState(prevData => {
            return {
              users: [...prevData.users, person],
            };
          });
        }
      });
    this.setState({isLoading: false});
    // const uid = await AsyncStorage.getItem('uid');
    // this.setState({idUser: uid});

    // firebase
    //   .database()
    //   .ref(`messages/${uid}`)
    //   .once('child_added', result => {
    //     let person = result.val();

    //     person.id = result.key;
    //     this.state.chat.push({
    //       id: person.id,
    //     });
    //     this.setState({chat: this.state.chat});
    //   });
    // firebase
    //   .database()
    //   .ref('user/')
    //   .once('value', result => {
    //     let data = result.val();

    //     if (data !== null) {
    //       let users = Object.values(data);
    //       this.setState({
    //         users,
    //       });
    //     }
    //   });
    // const {users} = this.state;

    // let datas = users.filter(data => data.id !== uid);
    // this.setState({newFilter: datas, isLoading: false});
  };

  // filterMasage = async () => {
  //   console.log('Ok');

  //   const {users} = this.state;
  //   await AsyncStorage.getItem('uid').then(result => {
  //     console.log(result);

  //     let datas = users.filter(data => data.id !== result);
  //     this.setState({newFilter: datas});
  //   });
  // };

  render() {
    // const users = this.state.users;

    // const data2 = users.filter(data => data.id !== this.state.idUser);

    return (
      <Fragment>
        <StatusBar backgroundColor="#4287f5" />
        <Header style={{backgroundColor: '#4287f5'}}>
          <Left>
            <TouchableOpacity
              onPress={() => this.props.navigation.toggleDrawer()}>
              <FontAwesomeIcon size={17} color="white" icon={faBars} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title>Hy Chat</Title>
          </Body>
          <Right />
        </Header>
        <View>
          {this.state.isLoading ? (
            <View style={styles.load}>
              <Spinner color="blue" />
            </View>
          ) : (
            <FlatList
              data={this.state.users}
              numColumns={1}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      this.props.navigation.navigate('Chat', item)
                    }>
                    <View style={styles.item}>
                      <Image
                        style={styles.image}
                        source={{uri: `${item.image}`}}
                      />
                    </View>
                    <View style={styles.content}>
                      <Text style={styles.textName}>{item.name}</Text>
                      {/* <Text style={styles.textStatus}>{item.status}</Text> */}
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
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
    backgroundColor: 'white',
  },
  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoSplash: {
    width: 200,
    height: 200,
  },
  title: {
    color: '#FFF',
    opacity: 0.8,
    fontSize: 18,
  },
  button: {
    flexDirection: 'row',
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderColor: '#c4c4c4',
    margin: 4,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  content: {
    flex: 5,
    paddingLeft: 5,
    paddingTop: 5,
  },
  textName: {
    fontSize: 18,
    color: '#1c1c1c',
  },
  textStatus: {
    fontSize: 14,
    color: '#1c1c1c',
  },
  load: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
  },
});

export default Home;

import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  Header,
  Left,
  Right,
  Fab,
  List,
  ListItem,
  Title,
  Body,
  Thumbnail,
} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser, faBars} from '@fortawesome/free-solid-svg-icons';
import {TouchableHighlight} from 'react-native-gesture-handler';

class Home extends Component {
  static navigationOptions = {
    drawerLabel: 'Home',

    // drawerIcon: ({ tintColor }) => (
    //   <Image
    //     source={require('./chats-icon.png')}
    //     style={[styles.icon, { tintColor: tintColor }]}
    //   />
    // ),
  };

  render() {
    const Dummy = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: 'First Item',
        status: 'Online',
        img: 'http://pluspng.com/img-png/user-png-icon-male-user-icon-512.png',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        name: 'Second Item',
        status: 'Online',
        img: 'http://pluspng.com/img-png/user-png-icon-male-user-icon-512.png',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        name: 'Third Item',
        status: 'Online',
        img: 'http://pluspng.com/img-png/user-png-icon-male-user-icon-512.png',
      },
    ];
    return (
      <Fragment>
        <Header>
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
          <FlatList
            data={Dummy}
            numColumns={1}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate('Chat')}>
                  <View style={styles.item}>
                    <Image style={styles.image} source={{uri: `${item.img}`}} />
                  </View>
                  <View style={styles.content}>
                    <Text style={styles.textName}>{item.name}</Text>
                    <Text style={styles.textStatus}>{item.status}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <Fab
          active="true"
          style={{backgroundColor: '#5067FF'}}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate('Friends')}>
          <FontAwesomeIcon icon={faUser} />
        </Fab>
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
  },
  textName: {
    fontSize: 18,
    color: '#1c1c1c',
  },
  textStatus: {
    fontSize: 14,
    color: '#1c1c1c',
  },
});

export default Home;

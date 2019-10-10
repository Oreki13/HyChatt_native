import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {withNavigation} from 'react-navigation';
import {Header, Left, Right, Body, Title} from 'native-base';
import firebase from '../firebase/index';
import AsyncStorage from '@react-native-community/async-storage';

class Chat extends Component {
  state = {
    uid: this.props.navigation.state.params.id,
    name: this.props.navigation.state.params.name,
    image: this.props.navigation.state.params.image,
    status: this.props.navigation.state.params.status,
    massages: [],
    text: '',
  };

  //   static navigationOptions = () => {
  //     return {
  //       headerLeft: (
  //         <TouchableOpacity
  //           onPress={() => this.props.navigation.navigate('Home')}>
  //           <View style={{marginLeft: 10}}>
  //             <FontAwesomeIcon icon={faArrowLeft} />
  //           </View>
  //         </TouchableOpacity>
  //       ),
  //       headerTitle: 'Chats',
  //     };
  //   };
  //   state = {
  //     messages: [],
  //   };

  // componentWillMount() {
  //   this.setState({
  //     messages: [
  //       {
  //         _id: 1,
  //         text: 'Hello developer',
  //         createdAt: new Date(),
  //         user: {
  //           _id: 2,
  //           name: 'React Native',
  //           avatar: 'https://placeimg.com/140/140/any',
  //         },
  //       },
  //     ],
  //   });
  // }

  // componentDidMount = async () => {
  //   this.setState({
  //     myuid: await AsyncStorage.getItem('uid'),
  //     myname: await AsyncStorage.getItem('name'),
  //     avatar: await AsyncStorage.getItem('image'),
  //   });
  //   await firebase
  //     .database()
  //     .ref('messages')
  //     .child(this.state.myuid)
  //     .child(this.state.uid)
  //     .on('child_added', value => {
  //       this.setState(previousState => {
  //         return {
  //           massages: GiftedChat.append(previousState.massages, value.val()),
  //         };
  //       });
  //     });
  // };

  componentDidMount = async () => {
    const myid = await AsyncStorage.getItem('uid');
    const myname = await AsyncStorage.getItem('name');
    const avatar = await AsyncStorage.getItem('image');
    this.setState({myid, myname, avatar});
    firebase
      .database()
      .ref('messages')
      .child(this.state.myid)
      .child(this.state.uid)
      .on('child_added', val => {
        this.setState(previousState => ({
          massages: GiftedChat.append(previousState.massages, val.val()),
        }));
      });
  };

  sendMessage = async () => {
    if (this.state.text.length > 0) {
      let msgId = firebase
        .database()
        .ref('messages')
        .child(this.state.myid)
        .child(this.state.uid)
        .push().key;
      let updates = {};
      let message = {
        _id: msgId,
        text: this.state.text,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        user: {
          _id: this.state.myid,
          name: this.state.myname,
          avatar: this.state.avatar,
        },
      };
      updates[
        `messages/${this.state.myid}/${this.state.uid}/${msgId}`
      ] = message;
      updates[
        `messages/${this.state.uid}/${this.state.myid}/${msgId}`
      ] = message;
      firebase
        .database()
        .ref()
        .update(updates);
      this.setState({text: ''});
    }
  };

  // onSend(messages = []) {
  //   this.setState(previousState => ({
  //     messages: GiftedChat.append(previousState.messages, messages),
  //   }));
  // }
  render() {
    console.log('Hereee beib', this.state);

    return (
      <>
        <Header style={{backgroundColor: '#4287f5'}}>
          <Left>
            <TouchableOpacity
              style={styles.backAr}
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}>
              <FontAwesomeIcon style={styles.iconAr} icon={faArrowLeft} />
            </TouchableOpacity>
          </Left>
          <Body>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  marginRight: 10,
                }}
                source={{uri: this.state.image}}
              />
              <Title style={styles.title}>{this.state.name}</Title>
            </View>
          </Body>
          <Right />
        </Header>
        <GiftedChat
          messages={this.state.massages}
          onSend={this.sendMessage}
          showAvatarForEveryMessage={true}
          user={{
            _id: this.state.myid,
            name: this.state.myname,
            avatar: this.state.avatar,
          }}
          onInputTextChanged={value => this.setState({text: value})}
        />
      </>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    fontSize: 19,
  },
  backAr: {
    paddingLeft: 10,
  },
  iconAr: {
    color: 'white',
  },
});

export default withNavigation(Chat);

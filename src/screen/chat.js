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

class Chat extends Component {
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

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
  render() {
    return (
      <>
        <Header>
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
            <Title style={styles.title}>Nama Orang</Title>
          </Body>
          <Right />
        </Header>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
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

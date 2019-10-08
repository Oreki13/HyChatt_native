import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {DrawerNavigatorItems} from 'react-navigation-drawer';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserFriends} from '@fortawesome/free-solid-svg-icons';

// const StyleDrawer = props => (
//   <>
//     <View style={styles.header}>
//       <Text>Hello</Text>
//     </View>
//     <ScrollView>
//       <SafeAreaView
//         style={styles.container}
//         forceInset={{top: 'always', horizontal: 'never'}}>
//         <DrawerNavigatorItems {...props} />
//       </SafeAreaView>
//     </ScrollView>
//   </>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     width: '100%',
//     height: 200,
//     backgroundColor: '#000',
//     alignItems: 'center',
//   },
// });

class StyleDrawer extends Component {
  render() {
    console.log(DrawerNavigatorItems);

    return (
      <Fragment>
        <View style={styles.header}>
          <Image
            style={styles.img}
            source={{
              uri:
                'http://pluspng.com/img-png/user-png-icon-male-user-icon-512.png',
            }}
          />
          <Text>My Name</Text>
        </View>

        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate('Maps');
          }}>
          <View style={styles.row}>
            <FontAwesomeIcon icon={faUserFriends} />
            <Text style={{marginLeft: 10}}>Maps</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
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
    backgroundColor: '#b5fff8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    color: 'black',
    height: 70,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StyleDrawer;

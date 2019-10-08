import React, {Component, Fragment} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {Header, Left, Right, Body, Title, List, ListItem} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

class Friends extends Component {
  render() {
    return (
      <Fragment>
        <Header>
          <Left>
            <TouchableOpacity
              style={styles.IconAr}
              onPress={() => this.props.navigation.navigate('Home')}>
              <FontAwesomeIcon size={15} color="white" icon={faArrowLeft} />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title>Friends List</Title>
          </Body>
          <Right />
        </Header>
        <ScrollView>
          <List>
            <ListItem itemDivider>
              <Text>A</Text>
            </ListItem>
            <ListItem>
              <TouchableOpacity>
                <Text>Aaron Bennet</Text>
              </TouchableOpacity>
            </ListItem>
            <ListItem>
              <Text>Ali Connors</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text>B</Text>
            </ListItem>
            <ListItem>
              <Text>Bradley Horowitz</Text>
            </ListItem>
          </List>
        </ScrollView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  IconAr: {paddingLeft: 5},
});

export default Friends;

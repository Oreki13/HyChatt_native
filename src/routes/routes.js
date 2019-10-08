import React from 'react';
import {Button} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Home from '../screen/Home';
import styleDrawer from './styleDrawer';
import Chat from '../screen/chat';
import Maps from '../screen/Maps';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import Friends from '../screen/Friends';
import {faUserFriends} from '@fortawesome/free-solid-svg-icons';
import Login from '../screen/Auth/login';
import SignUp from '../screen/Auth/signUp';
import Auth from '../screen/Auth/Auth';
import Profile from '../screen/profile';

const AuthStack = createStackNavigator(
  {
    Auth,
    Login,
    SignUp,
  },
  {
    initialRouteName: 'Auth',
    headerMode: 'none',
  },
);

const HomeStack = createStackNavigator(
  {
    Home,
    Friends,
    Profile,
    Chat,
    Maps,
  },
  {
    contentOptions: {
      drawerIcon: <FontAwesomeIcon icon={faUserFriends} />,
    },
    initialRouteName: 'Home',
    headerMode: 'none',
  },
);

const Router = createDrawerNavigator(
  {
    AuthStack,
    HomeStack,
  },
  {
    contentOptions: {
      drawerIcon: <FontAwesomeIcon icon={faUserFriends} />,
    },
    initialRouteName: 'AuthStack',
    drawerPosition: 'left',
    contentComponent: styleDrawer,
    drawerType: 'front',
  },
);

export default createAppContainer(Router);

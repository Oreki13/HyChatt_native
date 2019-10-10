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
import ProfileFriends from '../screen/ProfileFriends';

const AuthStack = createStackNavigator(
  {
    Login,
    SignUp,
  },
  {
    initialRouteName: 'Login',
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
    ProfileFriends,
  },
  {
    initialRouteName: 'Home',
    contentOptions: {
      drawerIcon: <FontAwesomeIcon icon={faUserFriends} />,
    },

    headerMode: 'none',
  },
);

const stackDrawer = createDrawerNavigator(
  {
    HomeStack,
  },
  {
    initialRouteName: 'HomeStack',
    drawerPosition: 'left',
    contentComponent: styleDrawer,
    drawerType: 'front',
  },
);

const Router = createSwitchNavigator(
  {
    AuthStack,
    stackDrawer,
    Auth,
  },
  {
    initialRouteName: 'Auth',
    headerMode: 'none',
  },
);

export default createAppContainer(Router);

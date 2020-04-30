import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation'; 
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'; 
import Icon from 'react-native-vector-icons/Ionicons';
import Home from 'C:/Users/kalin/KManage/screens/Home.js';
import Category from 'C:/Users/kalin/KManage/screens/Category';
import About from 'C:/Users/kalin/KManage/screens/About';

export default class App extends React.Component {
  render() {
    return (
        <AppContainer />
    );
  }
}



const bottomTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home" size={25} color={tintColor} />
        )
      }
    },  
    Category: {
      screen: Category,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-apps" size={25} color={tintColor} />
        )
      }
    },
    About: {
      screen: About,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-information-circle-outline" size={25} color={tintColor} />
        )
      }
    },
  },
  {
    initialRouteName: 'Home',   
    activeColor: '#f0edf6',  
    inactiveColor: '#2C3E50',  
    barStyle: { backgroundColor: '#2ECC71' }, 
  }
);

const AppContainer = createAppContainer(bottomTabNavigator);
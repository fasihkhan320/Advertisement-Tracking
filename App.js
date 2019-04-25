
import React from 'react';
import {createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

export default createAppContainer(createBottomTabNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
 {
   defaultNavigationOptions: ({ navigation }) => ({
     tabBarIcon: ({ focused, horizontal, tintColor }) => {
       const { routeName } = navigation.state;
       let iconName;
       if (routeName === 'Home') {
         iconName = `ios-information-circle${focused ? '' : '-outline'}`;
       } else if (routeName === 'Details') {
         iconName = "ios-options";
       }

       return <Ionicons name={iconName} size={25} color={tintColor} />;
     },
    
   }),
   tabBarOptions: {
     activeTintColor: 'tomato',
     inactiveTintColor: 'gray',
   }
 },
  
));


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




// import React, {Component} from 'react';
// import {StyleSheet, View} from 'react-native';
// import PlaceInput from './src/component/PlaceInput/PlaceInput';
// import PlaceList from './src/component/PlaceList/PlaceList';
// import PlaceDetail from './src/component/PlaceDetail/PlaceDetail';
// import {connect} from 'react-redux';
// import {NavigationAction} from 'react-navigation';
// import {
//   addPlace,
//   deletePlace,
//   selectPlace,
//   deselectPlace
// } from "./src/Store/Action/Index";

// class App extends Component {
//   placeAddedHandler = placeName => {
//     this.props.onAddPlace(placeName);
//   };

//   placeDeletedHandler = () => {
//     this.props.onDeletePlace();
//   };

//   modalClosedHandler = () => {
//     this.props.onDeselectPlace();
//   };

//   placeSelectedHandler = key => {
//     this.props.onSelectPlace(key);
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         <PlaceDetail
//           selectedPlace={this.props.selectedPlace}
//           onItemDeleted={this.placeDeletedHandler}
//           onModalClosed={this.modalClosedHandler}
//         />
//         <PlaceInput onPlaceAdded={this.placeAddedHandler} />
//         <PlaceList
//           places={this.props.places}
//           onItemSelected={this.placeSelectedHandler}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 26,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "flex-start"
//   }
// });

// const mapStateToProps = state => {
//   return {
//     places: state.Places.Places,
//     selectedPlace: state.Places.SelectedPlace
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onAddPlace: name => dispatch(addPlace(name)),
//     onDeletePlace: () => dispatch(deletePlace()),
//     onSelectPlace: key => dispatch(selectPlace(key)),
//     onDeselectPlace: () => dispatch(deselectPlace())
//   };
// };



// export default connect(mapStateToProps,mapDispatchToProps)(App)






// import React, {Component} from 'react';
// import {StyleSheet, View} from 'react-native';
// import * as firebase from 'firebase'

// var config = {
//   apiKey: "AIzaSyDRvND1TYeqvcXlA7QYTIkplDjLKxIjuOA",
//   authDomain: "y-10-se.firebaseapp.com",
//   databaseURL: "https://y-10-se.firebaseio.com",
//   projectId: "y-10-se",
//   storageBucket: "y-10-se.appspot.com",
//   messagingSenderId: "755711451534"
// };
// firebase.initializeApp(config);

// const val=firebase.database()
// val.ref('Check').set({
//   Org_name:'fasih',
//   Email:'fasih@gmail',
//   Category:'Check',
//   Password:'abc',
//   Cpassword:'abc',
// })
// export default class App extends Component {

//   render() {
//     return (
//       <View style={styles.container}>
        
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 26,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "flex-start"
//   }
// });


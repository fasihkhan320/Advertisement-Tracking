
import React, { Component } from 'react'
import { View ,Button} from 'react-native'
import SelectMultiple from 'react-native-select-multiple'


const Ads = ['Clothes', 'Foods', 'Other Promotion']

class DetailsScreen extends Component {
  state = { selectedAds: [], counter:false}

  onSelectionsChange = (selectedAds) => {
    // selectedFruits is array of { label, value }
    this.setState({ selectedAds,counter:true })
  }
  send=()=>{
    if (this.state.counter === true){
    this.props.navigation.navigate('Home',{ 
      firstType:this.state.selectedAds[0].value,
      secondType:this.state.selectedAds[1].value
      })
  }else{
    this.props.navigation.navigate('Home')
  }
}

  render () {
    return (
      <View>
        <SelectMultiple
          items={Ads}
          selectedItems={this.state.selectedAds}
          onSelectionsChange={this.onSelectionsChange} />
        <Button title="Back"  onPress={this.send}
          />
      </View>
    )
  }
}
export default DetailsScreen;

// ***************************************************//

// import React from "react";
// import { View,Image,Text,StyleSheet} from "react-native";
// import MapView,{Marker,Callout} from 'react-native-maps';
// var org=''
// var abc=''
// class DetailsScreen extends React.Component {
//   constructor(){
//     super()
//     this.state={
//       lat:null,
//       long:null,
//       places:null,
//     }
//   }
  
//   componentWillMount() {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {

//               this.setState({
//                 lat:position.coords.latitude,
//                 long:position.coords.longitude
//               })
//               this.getPlaces()
//             }
//     )
//     this.watchUserPosition()
//   }
        
//   watchUserPosition=()=>{
//     this.watcher = navigator.geolocation.watchPosition(
//       (position) => {
//         this.setState({
//             lat: position.coords.latitude,
//             long: position.coords.longitude,
//         });
//       },
//       (error) => this.setState({ error: error.message }),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
//     )
//   }


//   getUrlWithParameters(lat,long,radius,type,T2,API){
//     org=T2
//     const url="https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
//     const location=`location=${lat},${long}&radius=${radius}`;
//     const typeData=`&type=${type}&keyword=${T2}`;
//     const key=`&key=${API}`;
//     abc=url+location+typeData+key
//     return `${url}${location}${typeData}${key}`
//   }

//   getPlaces=()=>{
//     const url=this.getUrlWithParameters(this.state.lat,this.state.long,5000,'Clothes','ChaseUp','AIzaSyD3l4cGMKq5FzfBiXdUzO4MKULTkH91DjE')
//     fetch(url)
//       .then((data)=>data.json())
//       .then((res)=>{
//         const arrayMarkers=[]
//         res.results.map((element,i)=>{
//           arrayMarkers.push(
//             <Marker
//               key={i}
//               coordinate={{
//                 latitude:element.geometry.location.lat,
//                 longitude:element.geometry.location.lng
//               }}
//             >
//             <Callout>
//               <View>
//                 <Text>{element.name}</Text>
//                 <Text>Open:{element.opening_hours.open_now ? 'Yes' : 'No'}</Text>
//               </View>
//             </Callout>
//             </Marker>
//           )
//           this.props.navigation.navigate('Home',{ 
//             firstType:org
//             })
//         })
//         this.setState({places:arrayMarkers})
//       })
//   }

//     render() {
//       return (
//         <View style={style.container}>
          
//           {this.state.lat ? <MapView
//           style={style.map}
//           provider={MapView.PROVIDER_GOOGLE}
//           showsUserLocation
//           followsUserLocation
//           initialRegion={{
//           latitude:this.state.lat,
//           longitude:this.state.long,
//           latitudeDelta: 0.0622,
//           longitudeDelta: 0.0622
//           }}
//         >
//         <Marker
//           coordinate={{
//             latitude:this.state.lat,
//             longitude:this.state.long
//           }}>
//           <View>
//             <Image style={{width:50,height:50}} source={require("./Map-Marker-Ball-Pink-icon.png")}/>
//           </View>
//         </Marker>
//         {this.state.places}
//         </MapView>:null}
//         </View>
//       );
//     }
//   }
// const style=StyleSheet.create({
//   container: {
//     position:'absolute',
//     top:0,
//     left:0,
//     right:0,
//     bottom:0,
//     justifyContent:'flex-end',
//     alignItems:'center'
//   },
//   map:{
//     position:'absolute',
//     top:0,
//     left:0,
//     right:0,
//     bottom:0,
//     height:'70%'
//   }
// })

// export default DetailsScreen;
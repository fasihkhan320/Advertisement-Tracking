import React,{Component} from "react";
import {StyleSheet,Image,Text,View,TouchableWithoutFeedback,ProgressBarAndroid} from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView,{Marker,Callout} from 'react-native-maps';


var org1=''
var org2=''
var l=[]
 class HomeScreen extends Component {
  
      state = {
        rate: 1,
        volume: 1,
        muted: false,
        resizeMode: 'cover',
        duration: 0.0,
        currentTime: 0.0,
        paused: false,
        pickerValueHolder: '1.0',
        pausedText: 'Play',
        url:"",
        data:'',
        imgDuration:30,
        lat:null,
        long:null,
        places:null,
      };
  
    video = Video;
  
    // load video event
    onLoad = (data) => {
      this.setState({ duration: data.duration });
      
    };
  
    // video is playing
    onProgress = (data) => {
      this.setState({ currentTime: data.currentTime });
    };
  
    // video ends
    onEnd = () => {
      this.setState({ paused: true, pausedText: 'Play'})
      this.video.seek(0);
    };
   
    getCurrentTimePercentage() {
      if (this.state.currentTime > 0) {
        return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
      }
      return 0;
    };
  
    // on press video event
    onPressVideo() {
      // showing controls if they don't show
      if(this.state.paused){
        this.setState({
          paused:false,
          pausedText: 'Playing'
        });
      }
      else{
        this.setState({
          paused:true,
          pausedText: 'Paused'
        });
      }
    }
  
    // parse seconds to time (hour:minute:second)
    parseSecToTime(sec) {
      var sec_num = parseInt(sec, 10); // don't forget the second param
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);
  
      if (hours   < 10) {hours   = "0" + hours;}
      if (minutes < 10) {minutes = "0" + minutes;}
      if (seconds < 10) {seconds = "0" + seconds;}
  
      return minutes + ':' + seconds;
    }
  
    
    ////////////////////////////////////////////

    componentWillMount() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
  
                this.setState({
                  lat:position.coords.latitude,
                  long:position.coords.longitude
                })
                this.getPlaces()
              }
      )
      this.watchUserPosition()
    }
          
    watchUserPosition=()=>{
      this.watcher = navigator.geolocation.watchPosition(
        (position) => {
          this.setState({
              lat: position.coords.latitude,
              long: position.coords.longitude,
          });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
      )
    }
  
  
    getUrlWithParameters(lat,long,radius,type,T2,API){
      org1=T2
      const url="https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
      const location=`location=${lat},${long}&radius=${radius}`;
      const typeData=`&type=${type}&keyword=${T2}`;
      const key=`&key=${API}`;
      return `${url}${location}${typeData}${key}`
    }
  
    getPlaces=()=>{
      const url=this.getUrlWithParameters(this.state.lat,this.state.long,5000,'clothes','ChaseUp',API)
      fetch(url)
        .then((data)=>data.json())
        .then((res)=>{
          const arrayMarkers=[]
          res.results.map((element,i)=>{
            arrayMarkers.push(
              <Marker
                key={i}
                coordinate={{
                  latitude:element.geometry.location.lat,
                  longitude:element.geometry.location.lng
                }}
              >
              <Callout>
                <View>
                  <Text>{element.name}</Text>
                  <Text>Open:{element.opening_hours.open_now ? 'Yes' : 'No'}</Text>
                </View>
              </Callout>
              </Marker>
            )
            org2=element.name
          })
          this.setState({places:arrayMarkers})
          if(org2 !== ''){
            
            fetch("https://example.firebaseio.com/*********")
            .catch(err=>{
              alert('Something Went Wrong')
            })
            .then(res=>res.json())
            .then(parsedRes=>{
              for(let key in parsedRes){
                    this.setState({
                      data:parsedRes[key].dataType,
                      url:parsedRes[key].url
                    })
                  }
                })
                setTimeout(() => {
                  this.setState({data:''})
                }, 8000);
          }
        })
    }

    ////////////////////////////////////////////
    render() {
    
      return (
        <View style={styles.container}>
              {this.state.lat !== null && this.state.data=='' && <MapView
                style={styles.map}
                showsUserLocation
                followsUserLocation
                initialRegion={{
                  latitude:this.state.lat,
                  longitude:this.state.long,
                  latitudeDelta: 0.0622,
                  longitudeDelta: 0.0622
                }}
              >
              <Marker
                coordinate={{
                  latitude:this.state.lat,
                  longitude:this.state.long
                }}>
                <View>
                  <Image style={{width:50,height:50}} source={require("./Map-Marker-Ball-Pink-icon.png")}/>
                </View>
              </Marker>
              {this.state.places}
              </MapView>}
              {this.state.data === 'png' || this.state.data ==='jpeg' || this.state.data ==='jpg'?
                <Image source={{uri:this.state.url}}
                style={{width: '95%', height: '93%',marginTop:'-5%'}} 
                />:null}
                { this.state.data === 'mp4'?<TouchableWithoutFeedback
                  style={styles.fullScreen}
                  onPress={() => this.onPressVideo()}>
                  <Video
                    ref={(ref) => { this.video = ref }}
                    /* For ExoPlayer */
                    source={{ uri: this.state.url }} 
                    // source={require('./tom_and_jerry_31.mp4')}
                    style={styles.fullScreen}
                    rate={this.state.rate}
                    paused={this.state.paused}
                    volume={this.state.volume}
                    muted={this.state.muted}
                    resizeMode={this.state.resizeMode}
                    onLoad={this.onLoad}
                    onProgress={this.onProgress}
                    onEnd={this.onEnd}
                    onAudioBecomingNoisy={this.onAudioBecomingNoisy}
                    onAudioFocusChanged={this.onAudioFocusChanged}
                    repeat={false}
                  />
                </TouchableWithoutFeedback>:null}
              <View style={styles.playControl}>
                <Text>{this.state.paused ? ( 
                    <Ionicons onPress={() => this.onPressVideo()} size={30} name="ios-play-circle" color="white" />): (null)
                    }
                    {l}
                </Text>
              </View>
              <View style={styles.controls}>
              
                { this.state.data === 'mp4'?
                <View>
                  <ProgressBarAndroid
                    style={styles.progress}
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={this.getCurrentTimePercentage()}
                    color="yellow"
                  />
                  <Text style={{color:"white",fontWeight:"bold"}}>{this.parseSecToTime(parseInt(this.state.currentTime))}/{this.parseSecToTime(parseInt(this.state.duration))}</Text>
                </View>:null}
              </View>
              
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    justifyContent:'flex-end',
    alignItems:'center',
    backgroundColor:'tomato'
    },
    fullScreen: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    playButton: {
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
    },
    controls: {
      opacity: 0.7,
      borderRadius: 5,
      position: 'absolute',
      bottom: 25,
      left: 20,
      right: 20,
    },
    progress: {
      flex: 1,
      flexDirection: 'row',
      borderRadius: 3,
      overflow: 'hidden',
    },
    playControl: {
      color:"white",
      bottom:30,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    map:{
      position:'absolute',
      top:0,
      left:0,
      right:0,
      bottom:0,
    }
  });

export default HomeScreen;

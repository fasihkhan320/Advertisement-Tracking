
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

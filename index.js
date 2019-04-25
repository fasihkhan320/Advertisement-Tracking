import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import {Provider} from 'react-redux';
// import ConfigStore from './src/Store/ConfigStore';

// const store=ConfigStore()

// const RNRedux=()=>(
//     <Provider store={store}>
//         <App />
//     </Provider>
// )

AppRegistry.registerComponent(appName,() =>App);

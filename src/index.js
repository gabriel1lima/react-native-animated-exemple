import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './routes';
import Reactotron from 'reactotron-react-native';

if (__DEV__) {
    console.tron = Reactotron
    .configure({ host: '192.168.111.21' })
    .useReactNative()
    .connect();
}

const App = () => (
  <>
    <Routes />
  </>
);

export default App;
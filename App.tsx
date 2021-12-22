import React, {useState} from 'react';
import Intro from './src/screens/Intro/Intro';
import {Provider as PaperProvider} from 'react-native-paper';
import GlobalState from './src/context/globalState';
import MainNavigator from './src/navigator/MainNavigator';
import {Loading} from './src/components/Loading';
import {Provider} from 'react-redux';
import store from './src/reduxSaga/store';
import AuthNavigator from './src/navigator/AuthNavigator';
import {HAlert} from './src/components/HAlert';
import { Platform, UIManager } from 'react-native';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const AppRoot = () => {
  let isLoggin = true;
  return (
    <React.Fragment>
      <Intro />
      {isLoggin ? <MainNavigator /> : <AuthNavigator />}
      <Loading />
      <HAlert />
    </React.Fragment>
  );
};
const App = () => {
  return (
    <PaperProvider>
      <Provider store={store}>
        <AppRoot />
      </Provider>
    </PaperProvider>
  );
};
export default App;

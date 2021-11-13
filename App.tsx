import React, { useState } from 'react';
import Intro from './src/screens/Intro/Intro';
import { Provider as PaperProvider } from 'react-native-paper';
import GlobalState from './src/context/globalState';
import MainNavigator from './src/navigator/MainNavigator';
import { Loading } from './src/components/Loading';
import { Provider } from 'react-redux';
import store from './src/reduxSaga/store';

const AppRoot = () => {
  return (
    <React.Fragment>
      <Intro />
      <MainNavigator />
      <Loading />
    </React.Fragment>
  )
}
const App = () => {
  return (
    <PaperProvider>
      <Provider store={store}>
        <AppRoot />
      </Provider>
    </PaperProvider>
  )
}
export default App;

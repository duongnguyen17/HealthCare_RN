import React, { useState } from 'react';
import Intro from './src/screens/Intro/Intro';
import { Provider as PaperProvider } from 'react-native-paper';
import GlobalState from './src/context/globalState';
import MainNavigator from './src/navigator/MainNavigator';
import { Loading } from './src/components/Loading';
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
      <GlobalState>
        <AppRoot />
      </GlobalState>
    </PaperProvider>
  )
}
export default App;

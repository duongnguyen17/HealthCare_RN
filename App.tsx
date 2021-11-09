/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import Intro from './src/screens/Intro/Intro';
import { Provider as PaperProvider } from 'react-native-paper';
import GlobalState from './src/context/globalState';
const AppRoot = () => {
  return (
    <React.Fragment>
      <Intro />
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

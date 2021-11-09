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
import Intro from './src/screens/Intro';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
const AppRedux = () => {
  return(
    <React.Fragment>

    </React.Fragment>
  )
}
const App =() => {
  <PaperProvider>
    {/* <Provider store={}> */}
      <AppRedux/>
    {/* </Provider> */}
  </PaperProvider>
}
export default App;

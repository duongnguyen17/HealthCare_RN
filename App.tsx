import React, { useEffect, useRef } from 'react';
import Intro from './src/screens/Intro/Intro';
import { Provider as PaperProvider } from 'react-native-paper';
import GlobalState from './src/context/globalState';
import MainNavigator from './src/navigator/MainNavigator';
import { Loading } from './src/components/Loading';
import { Provider } from 'react-redux';
import store from './src/reduxSaga/store';
import AuthNavigator from './src/navigator/AuthNavigator';
import { HAlert } from './src/components/HAlert';
import { Platform, UIManager } from 'react-native';
import RealmManager from './src/realm';
import { setStatusBarBackground } from './src/utils/statusBarUtils';
import { COLORS } from './src/common';

// để sử dụng LayoutAnimation
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
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
  const ref = useRef<Realm>();
  useEffect(() => {
    setStatusBarBackground(COLORS.TRANSPARENTS)
    RealmManager.getRealm().then(realm => {
      ref.current = realm;
    });
    return () => {
      if (ref.current != undefined) ref.current.close();
    };
  }, []);
  return (
    <PaperProvider>
      <Provider store={store}>
        <AppRoot />
      </Provider>
    </PaperProvider>
  );
};
export default App;

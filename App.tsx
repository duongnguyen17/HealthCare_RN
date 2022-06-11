import React, { useCallback, useEffect, useRef, useState } from 'react';
import Intro from './src/screens/Intro/Intro';
import { Provider as PaperProvider } from 'react-native-paper';
import MainNavigator from './src/navigator/MainNavigator';
import { Loading } from './src/components/Loading';
import { Provider } from 'react-redux';
import store from './src/reduxSaga/store';
import AuthNavigator from './src/navigator/AuthNavigator';
import { HAlert } from './src/components/HAlert';
import { Platform, StatusBar, UIManager } from 'react-native';
import RealmManager from './src/realm';

// để sử dụng LayoutAnimation
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AppRoot = () => {
  let isLoggin = true;
  const [isIntro, setIsIntro] = useState<boolean>(true)

  if (isIntro) {
    return <Intro setIsIntro={setIsIntro} />
  }
  return (
    <React.Fragment>
      {isLoggin ? <MainNavigator /> : <AuthNavigator />}
      <Loading />
      <HAlert />
    </React.Fragment>
  );
};
const App = () => {
  const ref = useRef<Realm>();
  useEffect(() => {
    // setStatusBarBackground("rgba(0, 0, 0, 0.1)")
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
        <StatusBar barStyle={"light-content"} />
        <AppRoot />
      </Provider>
    </PaperProvider>
  );
};
export default App;

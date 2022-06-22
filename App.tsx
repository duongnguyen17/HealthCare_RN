import React, { useEffect, useRef, useState } from 'react';
import { Platform, StatusBar, UIManager } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { HAlert } from './src/components/HAlert';
import { Loading } from './src/components/Loading';
import AuthNavigator from './src/navigator/AuthNavigator';
import MainNavigator from './src/navigator/MainNavigator';
import RealmManager from './src/realm';
import { authAction } from './src/reduxSaga/slices/authSlice';
import store from './src/reduxSaga/store';
import Intro from './src/screens/Intro/Intro';
import { RootStateType } from './src/type/type';

// để sử dụng LayoutAnimation
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AppRoot = () => {
  const dispatch = useDispatch()
  let isLogin = useSelector((state: RootStateType) => state.authState.isLogin)

  const [isIntro, setIsIntro] = useState<boolean>(true)

  useEffect(() => {
    if (isLogin == false) {
      dispatch(authAction.verifyToken())
    }
    // checkGGFLogined()
  }, [])

  // const checkGGFLogined = async () => {
  //   const googlefitLogined = await Storage.getItem(STORAGE_KEY.GOOGLEFIT_LOGINED)
  //   if (googlefitLogined !== "1") {
  //     const logined = await HGoogleFit.authorize()
  //     console.log('logined', logined)

  //   }
  // }

  if (isIntro) {
    return <Intro setIsIntro={setIsIntro} />
  }
  return (
    <React.Fragment>
      {isLogin ? <MainNavigator /> : <AuthNavigator />}
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

import React, {useEffect, useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {STRINGS} from '../common';
import ForgotPasswordScreen from '../screens/AuthScreens/ForgotPasswordScreen';
import RegisterScreen from '../screens/AuthScreens/RegisterScreen';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import VerifyOTPScreen from '../screens/AuthScreens/VerifyOTPScreen';
import RegisterFinishScreen from '../screens/AuthScreens/RegisterFinishScreen';
import {setNavigator} from './NavigationServices';

const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
  const navigation =
    useRef<NavigationContainerRef<ReactNavigation.RootParamList>>();

  useEffect(() => {
    setNavigator(navigation);
  }, []);
  return (
    ///@ts-ignore cònlig giữa react-navigation-ts và React-ts
    <NavigationContainer ref={navigation}>
      <Stack.Navigator
        initialRouteName={STRINGS.ROUTE.AUTH.LOGIN}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={STRINGS.ROUTE.AUTH.LOGIN} component={LoginScreen} />
        <Stack.Screen
          name={STRINGS.ROUTE.AUTH.REGISTER}
          component={RegisterScreen}
        />
        <Stack.Screen
          name={STRINGS.ROUTE.AUTH.VERIFY_OTP}
          component={VerifyOTPScreen}
        />
        <Stack.Screen
          name={STRINGS.ROUTE.AUTH.FORGOT_PASSWORD}
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name={STRINGS.ROUTE.AUTH.REGISTER_FINISH}
          component={RegisterFinishScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AuthNavigator;

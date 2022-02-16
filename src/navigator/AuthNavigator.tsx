import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {STRINGS} from '../common';
import ForgotPasswordScreen from '../screens/AuthScreens/ForgotPasswordScreen';
import RegisterScreen from '../screens/AuthScreens/RegisterScreen';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import VerifyOTPScreen from '../screens/AuthScreens/VerifyOTPScreen';
import RegisterFinishScreen from '../screens/AuthScreens/RegisterFinishScreen';

const Stack = createNativeStackNavigator();
const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={STRINGS.SCREEN.AUTH.LOGIN}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={STRINGS.SCREEN.AUTH.LOGIN} component={LoginScreen} />
        <Stack.Screen name={STRINGS.SCREEN.AUTH.REGISTER} component={RegisterScreen} />
        <Stack.Screen
          name={STRINGS.SCREEN.AUTH.VERIFY_OTP}
          component={VerifyOTPScreen}
        />
        <Stack.Screen
          name={STRINGS.SCREEN.AUTH.FORGOT_PASSWORD}
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name={STRINGS.SCREEN.AUTH.REGISTER_FINISH}
          component={RegisterFinishScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AuthNavigator;

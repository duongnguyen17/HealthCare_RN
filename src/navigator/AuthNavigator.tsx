import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/AuthScreens/LoginScreen'
import { NavigationContainer } from '@react-navigation/native'
import RegisterScreen from '../screens/AuthScreens/RegisterScreen'
import { SCREEN_NAME } from '../common'
import ForgotPasswordScreen from '../screens/AuthScreens/ForgotPasswordScreen'


const Stack = createNativeStackNavigator()
const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREEN_NAME.LOGIN} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREEN_NAME.LOGIN} component={LoginScreen} />
        <Stack.Screen name={SCREEN_NAME.REGISTER} component={RegisterScreen} />
        <Stack.Screen name={SCREEN_NAME.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default AuthNavigator
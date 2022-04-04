import React, { useEffect, useRef } from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Image, TouchableOpacity } from 'react-native';
import { COLORS, STRINGS } from '../common';

//import screen
import Practice from '../screens/main/PracticeTab';
import Diary from '../screens/main/DiaryTab';
import Profile from '../screens/main/ProfileTab';
import Report from '../screens/main/ReportTab/index';
import MedicineScreen from '../screens/main/DiaryTab/MedicineScreen';
import ReportDetail from '../screens/ReportDetail'
import SearchScreen from '../screens/SearchScreen';
import VisitedScreen from '../screens/main/DiaryTab/VisitedScreen';
import { setNavigator } from './NavigationServices';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={STRINGS.ROUTE.MAIN_TABS.REPORT}
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color }) => {
          let icon: any
          switch (route.name) {
            case STRINGS.ROUTE.MAIN_TABS.PRACTICE:
              icon = <MaterialIcons
                name={"sports"}
                size={focused ? 37 : 28}
                color={color}
              />
              break;
            case STRINGS.ROUTE.MAIN_TABS.DIARY:
              icon = <MaterialIcons
                name={"event-note"}
                size={focused ? 34 : 26}
                color={color}
              />
              break;
            case STRINGS.ROUTE.MAIN_TABS.PROFILE:
              icon = <MaterialIcons
                name={"person"}
                size={focused ? 34 : 26}
                color={color}
              />
              break;
            default:
              icon = focused ? <Image style={{ width: 22, height: 22 }} source={require('../../assets/images/report_focused.png')} /> : <Image style={{ width: 18, height: 18 }} source={require('../../assets/images/report_unfocused.png')} />
              break;
          }
          return icon
        },
        tabBarActiveTintColor: COLORS.PURPLE,
        tabBarInactiveTintColor: COLORS.GRAY_DECOR,
        tabBarStyle: { height: 56 },
        tabBarLabelStyle: { fontSize: 14 },
      })}>
      <Tab.Screen component={Report} name={STRINGS.ROUTE.MAIN_TABS.REPORT} />
      <Tab.Screen
        component={Practice}
        name={STRINGS.ROUTE.MAIN_TABS.PRACTICE}
      />
      <Tab.Screen component={Diary} name={STRINGS.ROUTE.MAIN_TABS.DIARY} />
      <Tab.Screen component={Profile} name={STRINGS.ROUTE.MAIN_TABS.PROFILE} />
    </Tab.Navigator>
  );
};
const MainNavigator = () => {
  const navigation =
    useRef<NavigationContainerRef<ReactNavigation.RootParamList>>();

  useEffect(() => {
    setNavigator(navigation);
  }, []);
  return (
    ///@ts-ignore conflict giữa react-navigation-ts và React-ts
    <NavigationContainer ref={navigation}>
      <Stack.Navigator initialRouteName={STRINGS.ROUTE.TAB_NAVIGATOR}>
        <Stack.Screen
          component={TabNavigator}
          name={STRINGS.ROUTE.TAB_NAVIGATOR}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Report}
          name={STRINGS.ROUTE.REPORT_DETAIL}
          options={({ navigation }) => ({
            title: STRINGS.TITLE.OVER_VIEW,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <MaterialIcons
                  name="arrow-back-ios"
                  size={23}
                  color={COLORS.GRAY_DECOR}
                />
              </TouchableOpacity>
            ),
            headerTitleStyle: { fontSize: 28 },
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          component={MedicineScreen}
          name={STRINGS.ROUTE.DIARY.MEDICINE}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={SearchScreen}
          name={STRINGS.ROUTE.SEARCH}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={VisitedScreen}
          name={STRINGS.ROUTE.DIARY.VISITED}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;

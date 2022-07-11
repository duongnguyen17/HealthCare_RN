import React, { useEffect, useRef } from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONT_SIZE, STRINGS } from '../common';

//import screen
import Practice from '../screens/main/PracticeTab';
import Diary from '../screens/main/DiaryTab';
import Profile from '../screens/main/ProfileTab';
import Report from '../screens/main/ReportTab/index';
import MedicineScreen from '../screens/MedicineScreen';
import ReportDetail from '../screens/ReportDetail'
import RunningScreen from '../screens/RunningScreen';
import SearchScreen from '../screens/SearchScreen';
import VisitedScreen from '../screens/VisitedScreen';
import { setNavigator } from './NavigationServices';
import Storage from '../utils/Storage';
import ProfileScreen from '../screens/ProfileScreen';
import ListMedicineScreen from '../screens/ListMedicineScreen';
import ListVisitedScreen from '../screens/ListVisitedScreen';
import ListLocationScreen from '../screens/ListLocationScreen';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={STRINGS.ROUTE.MAIN_TABS.DIARY}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: ({ focused, color }) => {
          let title: any
          switch (route.name) {
            case STRINGS.ROUTE.MAIN_TABS.PRACTICE:
              title = <Text style={[styles.labelTabBar, { color: color }]}>Luyện tập</Text>
              break;
            case STRINGS.ROUTE.MAIN_TABS.DIARY:
              title = <Text style={[styles.labelTabBar, { color: color }]}>Ghi chú</Text>
              break;
            case STRINGS.ROUTE.MAIN_TABS.PROFILE:
              title = <Text style={[styles.labelTabBar, { color: color }]}>Cá nhân</Text>
              break;
            default:
              title = <Text style={[styles.labelTabBar, { color: color }]}>Thống kê</Text>
              break;
          }
          return title
        },
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
        tabBarActiveTintColor: COLORS.BLUE,
        tabBarInactiveTintColor: COLORS.GRAY_TEXT_2,
        tabBarStyle: { height: 56, backgroundColor: COLORS.LIGHT_BLUE_1 },
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

    if (navigation.current) {
      Storage.getItem(STRINGS.STORAGE_KEY.OPENED_NOTIFICATION).then(notify => {

        if (!notify) return;
        // remove cache
        Storage.setItem(STRINGS.STORAGE_KEY.OPENED_NOTIFICATION, null);

        switch (notify.action) {

        }
      })
    }
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
          component={ReportDetail}
          name={STRINGS.ROUTE.REPORT_DETAIL}
          options={({ navigation }) => ({
            title: STRINGS.REPORT_TAB.HEART_RATE,
            headerLeft: () => (
              <TouchableOpacity
                style={{ height: '100%' }}
                onPress={() => {
                  navigation.goBack();
                }}>
                <MaterialIcons
                  name="arrow-back-ios"
                  size={23}
                  color={COLORS.BLACK}
                />
              </TouchableOpacity>
            ),
            headerTitleStyle: { fontSize: FONT_SIZE.BIG_HEADER },
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
        <Stack.Screen
          component={RunningScreen}
          name={STRINGS.ROUTE.RUNNING}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={ProfileScreen}
          name={STRINGS.ROUTE.PROFILE}
          options={({ navigation }) => ({
            title: STRINGS.PROFILE_SCREEN.PROFILE,
            headerLeft: () => (
              <TouchableOpacity
                style={{ height: '100%' }}
                onPress={() => {
                  navigation.goBack();
                }}>
                <MaterialIcons
                  name="arrow-back-ios"
                  size={23}
                  color={COLORS.BLACK}
                />
              </TouchableOpacity>
            ),
            headerTitleStyle: { fontSize: FONT_SIZE.BIG_HEADER },
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          component={ListMedicineScreen}
          name={STRINGS.ROUTE.LIST_MEDICINE_SCREEN}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={ListVisitedScreen}
          name={STRINGS.ROUTE.LIST_VISITED_SCREEN}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={ListLocationScreen}
          name={STRINGS.ROUTE.LIST_LOCATION_SCREEN}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;

const styles = StyleSheet.create({
  labelTabBar: {
    fontSize: FONT_SIZE.CONTENT
  }
})
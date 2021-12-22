import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';
import {SCREEN, height, width} from '../common';

//import screen
import Practice from '../screens/PracticeTab';
import Diary from '../screens/DiaryTab';
import Profile from '../screens/ProfileTab';
import OverView from '../screens/PracticeTab/OverViewScreen';
import MedicineScreen from '../screens/DiaryTab/MedicineScreen';
import SearchScreen from '../screens/SearchScreen';
import VisitedScreen from '../screens/DiaryTab/VisitedScreen';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={SCREEN.MAIN_TABS.PRACTICE}
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarIcon: ({focused, color}) => {
          let iconName: any;
          if (route.name === 'Practice') {
            iconName = 'sports';
          } else if (route.name === 'Diary') {
            iconName = 'event-note';
          } else {
            iconName = 'person';
          }
          return (
            <MaterialIcons
              name={iconName}
              size={focused ? 37 : 26}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: '#33ccff',
        tabBarInactiveTintColor: '#cccccc',
        // tabBarStyle: { height: 55 },
        tabBarLabelStyle: {fontSize: 13},
      })}>
      <Tab.Screen component={Practice} name={SCREEN.MAIN_TABS.PRACTICE} />
      <Tab.Screen component={Diary} name={SCREEN.MAIN_TABS.DIARY} />
      <Tab.Screen component={Profile} name={SCREEN.MAIN_TABS.PROFILE} />
    </Tab.Navigator>
  );
};
const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREEN.TAB_NAVIGATOR}>
        <Stack.Screen
          component={TabNavigator}
          name={SCREEN.TAB_NAVIGATOR}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={OverView}
          name={SCREEN.PRACTICE.OVERVIEW}
          options={({navigation}) => ({
            title: 'Tổng quan',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <MaterialIcons
                  name="arrow-back-ios"
                  size={23}
                  color={'#cccccc'}
                />
              </TouchableOpacity>
            ),
            headerTitleStyle: {fontSize: 28},
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          component={MedicineScreen}
          name={SCREEN.DIARY.MEDICINE}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={SearchScreen}
          name={SCREEN.SEARCH}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={VisitedScreen}
          name={SCREEN.DIARY.VISITED}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;

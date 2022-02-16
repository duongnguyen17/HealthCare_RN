import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';
import {COLORS, STRINGS} from '../common';

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
      initialRouteName={STRINGS.SCREEN.MAIN_TABS.PRACTICE}
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
        tabBarActiveTintColor: COLORS.LIGHT_BLUE,
        tabBarInactiveTintColor: COLORS.GRAY_DECOR,
        // tabBarStyle: { height: 55 },
        tabBarLabelStyle: {fontSize: 13},
      })}>
      <Tab.Screen
        component={Practice}
        name={STRINGS.SCREEN.MAIN_TABS.PRACTICE}
      />
      <Tab.Screen component={Diary} name={STRINGS.SCREEN.MAIN_TABS.DIARY} />
      <Tab.Screen component={Profile} name={STRINGS.SCREEN.MAIN_TABS.PROFILE} />
    </Tab.Navigator>
  );
};
const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={STRINGS.SCREEN.TAB_NAVIGATOR}>
        <Stack.Screen
          component={TabNavigator}
          name={STRINGS.SCREEN.TAB_NAVIGATOR}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={OverView}
          name={STRINGS.SCREEN.PRACTICE.OVERVIEW}
          options={({navigation}) => ({
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
            headerTitleStyle: {fontSize: 28},
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen
          component={MedicineScreen}
          name={STRINGS.SCREEN.DIARY.MEDICINE}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          component={SearchScreen}
          name={STRINGS.SCREEN.SEARCH}
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={VisitedScreen}
          name={STRINGS.SCREEN.DIARY.VISITED}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigator;

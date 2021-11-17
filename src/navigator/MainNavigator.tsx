import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Practice from "../screens/PracticeTab"
import Diary from "../screens/DiaryTab"
import Profile from "../screens/ProfileTab"
import { SCREEN_SIZE } from "../common"
import OverView from "../screens/PracticeTab/OverViewScreen"
import { TouchableOpacity } from "react-native"


const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()
const TabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Practice" screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color }) => {
        let iconName: any;
        if (route.name === "Practice") {
          iconName = "sports"
        }
        else if (route.name === "Diary") {
          iconName = "event-note"
        } else {
          iconName = "person"
        }
        return <MaterialIcons name={iconName} size={focused ? 37 : 26} color={color} />
      },
      // tabBarLabel: () => {
      //   let label: String = "";
      //   if (route.name === "Practice") {
      //     label = "sports"
      //   }
      //   else if (route.name === "Diary") {
      //     label = "event-note"
      //   } else {
      //     label = "person"
      //   }
      //   return label
      // },
      tabBarActiveTintColor: '#33ccff',
      tabBarInactiveTintColor: '#cccccc',
      tabBarStyle: { height: 55 },
      tabBarLabelStyle: { fontSize: 13 }
    })}>
      <Tab.Screen component={Practice} name="Practice" />
      <Tab.Screen component={Diary} name="Diary" />
      <Tab.Screen component={Profile} name="Profile" />
    </Tab.Navigator>
  )
}
const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TabNavigator" >
        <Stack.Screen component={TabNavigator} name="TabNavigator" options={{ headerShown: false }} />
        <Stack.Screen component={OverView} name="OverView" options={({ navigation }) => ({
          title: 'Tổng quan',
          headerLeft: () => (
            <TouchableOpacity onPress={() => {
              navigation.goBack()
            }}>
              <MaterialIcons name="arrow-back-ios" size={23} color={"#cccccc"} />
            </TouchableOpacity>
          ),
          headerTitleStyle: { fontSize: 28 },
          headerTitleAlign: 'center'
        })} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default MainNavigator
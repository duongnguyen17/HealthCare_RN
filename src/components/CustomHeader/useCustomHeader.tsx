import React, { useEffect } from 'react';
import { View } from 'react-native';
import { NavigationProp } from '@react-navigation/core';
import LinearGradient from 'react-native-linear-gradient';

export default ({ navigation, title, deps = [], leftIcon, leftIconColor, rightIcon, rightIconColor, backgroundColor, onRightPress, onLeftPress }: HeaderProps) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerBackground: () => (
        <LinearGradient colors={["#00aaff", "#66ccff", "#80d4ff"]} style={{ height: 50, width: '100%' }} />

      )
      
    })

  }, deps)
}


interface HeaderProps {
  navigation: NavigationProp<any, any>,
  title: String,
  leftIcon?: String,
  rightIcon?: String,
  backgroundColor?: String,
  onLeftPress?: () => void,
  onRightPress?: () => void,
  leftIconColor?: String,
  rightIconColor?: String,
  deps?: React.DependencyList,
}

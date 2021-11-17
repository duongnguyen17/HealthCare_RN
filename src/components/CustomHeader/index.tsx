import React, { useEffect } from 'react';
import { NavigationProp } from '@react-navigation/core';
export default ({ navigation, }: HeaderProps) => {
  useEffect(() => {


  }, [])
}


interface HeaderProps {
  navigation: navigationProp,
  title: String,
  leftIcon?: String,
  rightIcon?: String,
  backgroundColor?: String,
  leftIconColor?: String,
  rightIconColor?: String,
}
interface navigationProp extends NavigationProp<AppStackParamList>{

}
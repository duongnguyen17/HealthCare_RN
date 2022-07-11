import React from "react";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View, ViewProps } from "react-native";
// import { FrameProps } from "../../type/type";

const Frame = (props: FrameProps) => {
  // if (!!props.onPress) {
  //   return (
  //     <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress} activeOpacity={0.9} >
  //       {props.children}
  //     </TouchableOpacity >
  //   )
  // }
  return (
    <View style={[styles.container, props.style]} >
      {!!props.onPress ? <TouchableOpacity style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 1 }} onPress={props.onPress} /> : null}
      {props.children}
    </View>
  )
}

export default Frame
export interface FrameProps extends TouchableOpacityProps, ViewProps {
}
const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    shadowColor: '#000000',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    elevation: 3
  }
})
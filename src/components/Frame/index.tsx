import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
// import { FrameProps } from "../../type/type";

const Frame = (props: ViewProps) => {
  return (
    <View style={[styles.container, props.style]} >
      {props.children}
    </View>
  )
}

export default Frame
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    alignItems: 'center',
    marginVertical: 3,
    shadowColor: '#000000',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    elevation: 5
  }
})
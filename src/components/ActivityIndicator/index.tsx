import React from "react";
import { ActivityIndicatorProps, StyleSheet, View, ActivityIndicator } from 'react-native'

const Indicator = (props: ActivityIndicatorProps) => (
  <View style={[styles.container, StyleSheet.absoluteFill]}>
    <ActivityIndicator {...props} size={"large"} color={'blue'} />
  </View>
)
export default Indicator
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000044',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
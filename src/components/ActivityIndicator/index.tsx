import React from "react";
import { ActivityIndicatorProps, StyleSheet, View, ActivityIndicator } from 'react-native'

const Indicator = (props: ActivityIndicatorProps) => (
  <View style={styles.container}>
    <ActivityIndicator {...props} size={"large"} color={} />
  </View>
)
export default Indicator
const styles = StyleSheet.create({
  container: {

  }
})
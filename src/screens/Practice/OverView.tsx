import React from "react";
import { Text, ViewProps, View, StyleSheet } from "react-native";

const OverView = (props: ViewProps) => {
  return (
    <View style={styles.container}>
      <Text>
        Toorng quan
      </Text>
    </View>
  )
}

export default OverView
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'yellow' }
})
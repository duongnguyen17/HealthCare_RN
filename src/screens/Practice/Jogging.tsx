import React from "react";
import { Text, ViewProps, View, StyleSheet } from "react-native";

const Jogging = (props: ViewProps) => {
  return (
    <View style={styles.container}>
      <Text>
        Jogging
      </Text>
    </View>
  )
}

export default Jogging
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'gray' }
})
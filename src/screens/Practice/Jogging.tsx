import React from "react";
import { Text, ViewProps, View, StyleSheet } from "react-native";
import { TabViewProps } from "./OverView";

const Jogging = (props: TabViewProps) => {
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
import React from "react";
import { Text, ViewProps, View, StyleSheet } from "react-native";
import { TabViewProps } from "./OverView";

const HeartBeat = (props: TabViewProps) => {
  return (
    <View style={styles.container}>
      <Text>
        HeartBeat
      </Text>
    </View>
  )
}

export default HeartBeat
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(217, 217, 217,0)' }
})
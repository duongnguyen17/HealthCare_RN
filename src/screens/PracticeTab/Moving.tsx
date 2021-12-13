import React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { TabViewProps } from "../../type/type";

const Moving = (props: TabViewProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>
        Moving
      </Text>
    </SafeAreaView>
  )
}

export default Moving
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(217, 217, 217,0)' }
})
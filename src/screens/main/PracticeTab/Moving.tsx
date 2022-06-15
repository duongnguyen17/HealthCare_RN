import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { TabViewProps } from "../../../type/type";
import PracticeItem from "./components/PracticeItem";

const Moving = (props: TabViewProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <PracticeItem />
    </SafeAreaView>
  )
}

export default Moving
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(217, 217, 217,0)',
  },
})
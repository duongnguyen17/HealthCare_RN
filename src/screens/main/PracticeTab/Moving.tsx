import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { STRINGS } from "../../../common";
import { navigateTo } from "../../../navigator/NavigationServices";
import { TabViewProps } from "../../../type/type";
import PracticeItem from "./components/PracticeItem";

const Moving = (props: TabViewProps) => {

  const gotoRunningScreen = () => {
    navigateTo(STRINGS.ROUTE.RUNNING)
  }

  return (
    <SafeAreaView style={styles.container}>
      <PracticeItem onPress={gotoRunningScreen} />
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
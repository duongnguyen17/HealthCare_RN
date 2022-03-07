import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { TabViewProps } from '../../type/type';

const HeartBeat = (props: TabViewProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>HeartBeat</Text>
    </SafeAreaView>
  );
};

export default HeartBeat;
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'rgba(217, 217, 217,0)'},
});

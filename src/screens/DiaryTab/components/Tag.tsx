import React from 'react';
import {StyleSheet, View} from 'react-native';

const Tag = ({children}: TagProps) => (
  <View style={styles.containerTag}>
    <View style={styles.containerMargin}>{children}</View>
  </View>
);

export default Tag;
const styles = StyleSheet.create({
  containerTag: {
    borderBottomWidth: 1,
    borderColor: '#cccccc',
  },
  containerMargin: {marginHorizontal: 20, marginVertical: 10},
});
interface TagProps {
  children: React.ReactNode;
}

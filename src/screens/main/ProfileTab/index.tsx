import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, ViewProps} from 'react-native';

const Profile = (prop: ViewProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tab thông tin cá nhân</Text>
    </SafeAreaView>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

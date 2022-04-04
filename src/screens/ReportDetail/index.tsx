import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import CardIndex from '../../components/Frame/CardIndex';
import { ScreenProps } from '../../type/type';

export default (props: ScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <CardIndex
          title='Di chuyển'
          onPress={() => {
            console.log('press')
          }}
          measurementTime={'đo lúc 08:00 AM'}
          style={{ height: 300 }}></CardIndex>
        <CardIndex
          title='Di chuyển'
          onPress={() => {
            console.log('press')
          }}
          measurementTime={'đo lúc 08:00 AM'}
          style={{ height: 300 }}></CardIndex>
        <CardIndex
          title='Di chuyển'
          onPress={() => {
            console.log('press')
          }}
          measurementTime={'đo lúc 08:00 AM'}
          style={{ height: 300 }}></CardIndex>
      </ScrollView>
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  container: {

  }
})
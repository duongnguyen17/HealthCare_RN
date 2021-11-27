import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import CardIndex from '../../../components/Frame/CardIndex';
import { ScreenProps } from '../../../type/type';

export default (props: ScreenProps) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <CardIndex
          title='Di chuyển'
          onPress={() => {
            console.log('press')
          }}
          measurementTime={'đo lúc 08:00 AM'}
          style={{ height: 300 }}></CardIndex>
        <CardIndex
          title='Giấc ngủ'
          onPress={() => {
            console.log('press')
          }}
          measurementTime={'đo lúc 08:00 AM'}
          style={{ height: 300 }}></CardIndex>
        <CardIndex
          title='Nhịp tim'
          onPress={() => {
            console.log('press')
          }}
          measurementTime={'đo lúc 08:00 AM'}
          style={{ height: 300 }}></CardIndex>
      </ScrollView>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {

  }
})
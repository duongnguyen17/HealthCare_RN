import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import ContainerView from '../../components/ContainerView';
import CardIndex from '../../components/Frame/CardIndex';
import HHeader from '../../components/HHeader';
import HeaderCommon from '../../components/HHeader/HHeaderCommon';
import { goBack } from '../../navigator/NavigationServices';
import { ScreenProps } from '../../type/type';

export default ({ title }: ScreenProps) => {
  return (
    <ContainerView>
      <HeaderCommon onPressLeftIcon={() => {
        goBack();
      }}
        title={title ?? ""} />
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
    </ContainerView >
  )

}

const styles = StyleSheet.create({
  container: {

  }
})
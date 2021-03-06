import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import { DIMENS } from '../../common';
const Intro = ({ setIsIntro }: any) => {
  const [isNext, setIsNext] = useState<Boolean>(false);
  const [isFirst, setIsFirst] = useState<Boolean>(false);
  useEffect(() => {
    getTest();
    const wait = setTimeout(() => {
      setIsNext(true);
      setIsIntro(false)
    }, 1500);

    return () => {
      clearTimeout(wait);
    };
  }, []);
  const getTest = async () => {
    const isJoined: string | null = await AsyncStorage.getItem('isJoined');
    if (isJoined == '1') {
      setIsFirst(false);
    } else {
      setIsFirst(true);
    }
  };
  if (isNext && !isFirst) {
    return null;
  } else if (!isNext) {
    return (
      <LinearGradient
        colors={['#00aaff', '#66ccff', '#b3e6ff']}
        style={styles.container}
        start={{ x: 0.5, y: 0.25 }}
        end={{ x: 0, y: 1.0 }}>
        {/* <Image source={{uri: ''}} /> */}
        <View style={styles.logoContainer}>
          <Text>Logo này</Text>
        </View>
      </LinearGradient>

    );
  } else {
    return (
      <View style={styles.container}>
        <Swiper style={{}} showsButtons={true} loop={false}>
          <View style={[styles.swipeScreen, { backgroundColor: '#9DD6EB' }]}>
            <Text>Màn giới thiệu 1</Text>
          </View>
          <View style={[styles.swipeScreen, { backgroundColor: '#97CAE5' }]}>
            <Text>Màn giới thiệu 2</Text>
          </View>
          <View style={[styles.swipeScreen, { backgroundColor: '#92BBD9' }]}>
            <Text>Màn giới thiệu 3</Text>
            <Button
              onPress={async () => {
                setIsFirst(false);
                await AsyncStorage.setItem('isJoined', '1');
              }}>
              Sử dụng không cần tài khoản
            </Button>
            <Button
              onPress={async () => {
                setIsFirst(false);
                await AsyncStorage.setItem('isJoined', '1');
              }}>
              Sử dụng tài khoản
            </Button>
          </View>
        </Swiper>
      </View>
    );
  }
};
export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: (DIMENS.SCREEN_HEIGHT * 1) / 3,
  },
  swipeScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

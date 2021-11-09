import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import { SCREEN_SIZE } from '../../common';
const Intro = () => {
  const [isNext, setIsNext] = useState<Boolean>(false)
  const [isFirst, setIsFirst] = useState<Boolean>(true)
  useEffect(() => {
    const wait = setTimeout(() => {
      setIsNext(true)
    }, 1500);
    return () => {
      clearTimeout(wait)
    }
  }, [])
  useEffect(() => {

  }, [])
  if (isNext && !isFirst) { return null }
  else if (!isNext) {
    return (
      <LinearGradient colors={["#00aaff", "#66ccff", "#80d4ff"]} style={styles.container}>
        {/* <Image source={{uri: ''}} /> */}
        <View style={styles.logoContainer}><Text>Logo này</Text></View>
      </LinearGradient>
    )
  }
  else {
    return (
      <Swiper style={styles.container} showsButtons={true} loop={false}>
        <View style={[styles.swipeScreen, { backgroundColor: '#9DD6EB' }]}>
          <Text>Màn giới thiệu 1</Text>
        </View>
        <View style={[styles.swipeScreen, { backgroundColor: '#97CAE5' }]}>
          <Text>Màn giới thiệu 2</Text>
        </View>
        <View style={[styles.swipeScreen, { backgroundColor: '#92BBD9' }]}>
          <Text>Màn giới thiệu 3</Text>
          <Button onPress={() => {
            setIsFirst(false)
          }}>Ấn vào đây để sang màn tiếp</Button>
        </View>
      </Swiper>
    )
  }
};
export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: SCREEN_SIZE.height * 1 / 3,
  },
  swipeScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
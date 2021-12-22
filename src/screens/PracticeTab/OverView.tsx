import React, {useRef, useState} from 'react';
import {
  Text,
  ViewProps,
  View,
  StyleSheet,
  ScrollView,
  Animated,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {FONT_SIZE, SCREEN} from '../../common';
import Frame from '../../components/Frame';
import HairLine from '../../components/HairLine';
import HSwipe from '../../components/HSwipe';
import {TabViewProps} from '../../type/type';

const OverView = ({scrollY, navigation}: TabViewProps) => {
  const [isReFresh, setIsReFresh] = useState(false);
  const onRefresh = () => {
    setIsReFresh(true);
    setTimeout(() => {
      setIsReFresh(false);
    }, 1000);
  };
  const dataRe = [{}];
  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={6}
        refreshControl={
          <RefreshControl refreshing={isReFresh} onRefresh={onRefresh} />
        }>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <View style={{marginVertical: 16, width: '100%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // marginHorizontal: 10,
                }}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.textTarget}>60</Text>
                  <Text>còn 1940 bước để hoàn thành mục tiêu</Text>
                </View>
                <View
                  style={{width: 50, height: 50, backgroundColor: 'gray'}}
                />
              </View>
            </View>
            <HairLine style={{width: '100%'}} />
            <View style={{marginVertical: 10}}>
              <Text>Hiện 1 ít chỉ số ở đây</Text>
            </View>
            <HairLine style={{width: '60%'}} />
            <TouchableOpacity
              style={{width: '100%', alignItems: 'center'}}
              onPress={() => {
                navigation?.navigate(SCREEN.PRACTICE.OVERVIEW);
              }}>
              <Text style={{marginTop: 8}}>Xem thêm</Text>
            </TouchableOpacity>
          </View>
        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <View>
              <Text style={{fontSize: FONT_SIZE.HEADER}}>
                Một số sản phẩm phù hợp cho bạn
              </Text>
              <View>
                {/* <HSwipe data={dataRe} /> */}
              </View>
            </View>
            <HairLine style={{width: '60%'}} />
            <TouchableOpacity
              style={{width: '100%', alignItems: 'center'}}
              onPress={() => {
                navigation?.navigate(SCREEN.PRACTICE.OVERVIEW);
              }}>
              <Text style={{marginTop: 8}}>Xem thêm</Text>
            </TouchableOpacity>
          </View>
        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text>Chỗ này hiện 1 thông tin này</Text>
          </View>
        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text>Chỗ này hiện 1 thông tin này</Text>
          </View>
        </Frame>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default OverView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  frame: {height:300},
  inLineFrame: {
    // backgroundColor: 'gray',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  textTarget: {
    fontSize: 55,
    color: 'orange',
  },
});

import React, { useRef, useState } from 'react';
import {
  Animated,
  SafeAreaView, StyleSheet,
  Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TabBar, TabView } from 'react-native-tab-view';
import { DIMENS, STRINGS } from '../../common';
import { ScreenProps } from '../../type/type';
import HeartBeat from './HeartBeat';
import Moving from './Moving';
import OverView from './OverView';

const Practice = ({navigation}: ScreenProps) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'overView', title: STRINGS.TITLE.OVER_VIEW},
    {key: 'moving', title: STRINGS.TITLE.MOVING},
    {key: 'heartBeat', title: STRINGS.TITLE.HEART_BEAT},
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={{
          height: DIMENS.SCREEN_HEIGHT,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 0,
        }}
        colors={['#4da6ff', '#e6f2ff', '#ffffff']}
        start={{x: 0.5, y: 0.25}}
        end={{x: 0, y: 1.0}}
      />
      <Animated.View
        style={[
          styles.header,
          {
            height: 150,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 150],
                  outputRange: [0, -150],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
        <Text>Chỗ này thêm gì đó cho đẹp</Text>
      </Animated.View>
      <Animated.View
        style={{
          height: DIMENS.SCREEN_HEIGHT,
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, 150],
                outputRange: [0, -150],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        {/* <View style={{flex: 1}}> */}
        <TabView
          style={[styles.tabView]}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: 'white', height: 1}}
              style={{
                backgroundColor: 'rgba(217, 217, 217,0)',
                elevation: 0,
              }}
            />
          )}
          navigationState={{index, routes}}
          renderScene={({route}) => {
            switch (route.key) {
              case 'overView':
                return <OverView scrollY={scrollY} navigation={navigation} />;
              case 'moving':
                return <Moving scrollY={scrollY} navigation={navigation} />;
              default:
                return <HeartBeat scrollY={scrollY} navigation={navigation} />;
            }
          }}
          onIndexChange={setIndex}
          initialLayout={{width: DIMENS.SCREEN_WIDTH}}
        />
        {/* </View> */}
      </Animated.View>
    </SafeAreaView>
  );
};

export default Practice;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'gray',
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
  },
  scrollView: {marginHorizontal: 7},
  tabView: {},
  frame: {
    height: 200,
    marginVertical: 10,
  },
});

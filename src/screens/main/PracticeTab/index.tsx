import React, { useState } from 'react';
import {
  SafeAreaView, StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TabBar, TabView } from 'react-native-tab-view';
import { DIMENS, STRINGS } from '../../../common';
import { ScreenProps } from '../../../type/type';
import HeartBeat from './HeartBeat';
import Moving from './Moving';

const Practice = ({ navigation }: ScreenProps) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'moving', title: STRINGS.TITLE.MOVING },
    { key: 'heartBeat', title: STRINGS.TITLE.HEART_BEAT },
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
        start={{ x: 0.5, y: 0.25 }}
        end={{ x: 0, y: 1.0 }}
      />
      <TabView
        style={[styles.tabView]}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white', height: 1 }}
            style={{
              backgroundColor: 'rgba(217, 217, 217,0)',
              elevation: 0,
            }}
          />
        )}
        navigationState={{ index, routes }}
        renderScene={({ route }) => {
          switch (route.key) {
            // case 'overView':
            //   return <OverView scrollY={scrollY} navigation={navigation} />;
            case 'moving':
              return <Moving navigation={navigation} />;
            default:
              return <HeartBeat navigation={navigation} />;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={{ width: DIMENS.SCREEN_WIDTH }}
      />
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
  scrollView: { marginHorizontal: 7 },
  tabView: {},
  frame: {
    height: 200,
    marginVertical: 10,
  },
});

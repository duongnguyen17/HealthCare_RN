import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TabBar, TabView } from 'react-native-tab-view';
import { COLORS, DIMENS, STRINGS } from '../../../common';
import ContainerView from '../../../components/ContainerView';
import { ScreenProps } from '../../../type/type';
import HeartBeat from './HeartBeat';
import Moving from './Moving';

const Practice = ({ navigation }: ScreenProps) => {
  const [index, setIndex] = useState(0);
  const [bgColor, setBgColor] = useState<Array<string>>([COLORS.LIGHT_BLUE, '#e6f2ff', '#ffffff'])
  const [routes] = useState([
    { key: STRINGS.PRACTICE_TAB.TITLE.MOVING, title: STRINGS.PRACTICE_TAB.TITLE.MOVING },
    { key: STRINGS.PRACTICE_TAB.TITLE.HEART_BEAT, title: STRINGS.PRACTICE_TAB.TITLE.HEART_BEAT },
  ]);
  // useFocusEffect(() => {
  //   switch (index) {
  //     case 0:
  //       setStatusBarBackground(COLORS.LIGHT_BLUE)
  //       break;

  //     default:
  //       setStatusBarBackground(COLORS.PURPLE)
  //       break;
  //   }
  // })
  useEffect(() => {
    switch (index) {
      case 0:
        // setStatusBarBackground(COLORS.LIGHT_BLUE)
        setBgColor([COLORS.LIGHT_BLUE, '#e6f2ff', '#ffffff'])
        break;

      default:
        // setStatusBarBackground(COLORS.PURPLE)
        setBgColor([COLORS.PURPLE, '#e6f2ff', '#ffffff'])
        break;
    }
  }, [index]);
  return (
    <ContainerView>
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
        colors={bgColor}
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
              backgroundColor: COLORS.TRANSPARENTS,
              elevation: 0,
            }}
          />
        )}
        navigationState={{ index, routes }}
        renderScene={({ route }) => {
          switch (route.key) {
            // case 'overView':
            //   return <OverView scrollY={scrollY} navigation={navigation} />;
            case STRINGS.PRACTICE_TAB.TITLE.MOVING:
              return <Moving navigation={navigation} />;
            default:
              return <HeartBeat navigation={navigation} />;
          }
        }}
        onIndexChange={setIndex}
        initialLayout={{ width: DIMENS.SCREEN_WIDTH }}
      />
    </ContainerView >
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

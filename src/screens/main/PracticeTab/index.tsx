import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TabBar, TabView } from 'react-native-tab-view';
import { COLORS, DIMENS, STRINGS } from '../../../common';
import ContainerView from '../../../components/ContainerView';
import { navigateTo } from '../../../navigator/NavigationServices';
import { ScreenProps } from '../../../type/type';
import TabBarIndicator from './components/TabBarIndicator';
import TabBarItem from './components/TabBarItem';
import HeartBeat from './HeartBeat';
import Moving from './Moving';

const Practice = ({ navigation }: ScreenProps) => {
  const [index, setIndex] = useState(0);
  const [bgColor, setBgColor] = useState<Array<string>>([COLORS.LIGHT_BLUE, '#e6f2ff', '#ffffff'])
  const [routes] = useState([
    { key: STRINGS.PRACTICE_TAB.TITLE.MOVING, title: STRINGS.PRACTICE_TAB.TITLE.JOGING },
    { key: STRINGS.PRACTICE_TAB.TITLE.HEART_BEAT, title: STRINGS.PRACTICE_TAB.TITLE.CYCLING },
  ]);

  useEffect(() => {
    switch (index) {
      case 0:
        setBgColor([COLORS.BLUE, '#e6f2ff', '#ffffff'])
        break;

      default:
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
        renderTabBar={propsTabBar => (
          <TabBar
            {...propsTabBar}
            style={{
              backgroundColor: COLORS.TRANSPARENTS,
              elevation: 0,
            }}
            // @ts-ignore
            renderTabBarItem={(props) => <TabBarItem {...props} />}
            // @ts-ignore
            renderIndicator={(props) => <TabBarIndicator {...props} width={40} />}
          />
        )}
        navigationState={{ index, routes }}
        renderScene={({ route }) => {
          switch (route.key) {
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
  },
  scrollView: { marginHorizontal: 7 },
  tabView: {},
  frame: {
    height: 200,
    marginVertical: 10,
  },
});

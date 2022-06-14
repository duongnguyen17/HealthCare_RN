import React, { useState } from 'react';
import {
  RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, DIMENS, FONT_SIZE, STRINGS } from '../../../common';
import ContainerView from '../../../components/ContainerView';
import Frame from '../../../components/Frame';
import HairLine from '../../../components/HairLine';
import HIcon from '../../../components/HIcon';
import { navigateTo } from '../../../navigator/NavigationServices';
import { TabViewProps } from '../../../type/type';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const OverView = ({ }: TabViewProps) => {

  const [isReFresh, setIsReFresh] = useState(false);
  const onRefresh = () => {
    setIsReFresh(true);
    setTimeout(() => {
      setIsReFresh(false);
    }, 1000);
  };
  const dataRe = [{}];
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
        colors={[COLORS.LIGHT_BLUE, '#e6f2ff', '#ffffff']}
        start={{ x: 0.5, y: 0.25 }}
        end={{ x: 0, y: 1.0 }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 8, marginTop: 4, marginBottom: 2 }}>
        <View>

        </View>
        <TouchableOpacity style={{ paddingVertical: 4, paddingHorizontal: 8 }} activeOpacity={0.7} onPress={() => { }}>
          <HIcon name='plus' font='AntDesign' color='white' size={22} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isReFresh} onRefresh={onRefresh} />
        }>
        {/* <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <View style={{ marginVertical: 16, width: '100%' }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // marginHorizontal: 10,
                }}>
                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.textTarget}>60</Text>
                  <Text>còn 1940 bước để hoàn thành mục tiêu</Text>
                </View>
                <View
                  style={{ width: 50, height: 50, backgroundColor: 'gray' }}
                />
              </View>
            </View>
            <HairLine style={{ width: '100%' }} />
            <View style={{ marginVertical: 10 }}>
              <Text>Hiện 1 ít chỉ số ở đây</Text>
            </View>
          </View>
        </Frame> */}
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>

            <Text style={styles.textTitle}>{STRINGS.REPORT_TAB.FOOT_STEP}</Text>

            <View style={{ marginTop: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
              <View style={{ width: 140, height: 140, justifyContent: 'center', alignItems: 'center' }}>
                <AnimatedCircularProgress
                  style={{ position: 'absolute' }}
                  rotation={0}
                  size={140}
                  width={10}
                  fill={40000 / 4000}
                  tintColor={COLORS.BLUE}
                  onAnimationComplete={() => console.log('onAnimationComplete')}
                  backgroundColor={COLORS.LIGHT_BLUE_1} />
                <HIcon name='shoe-print' font='MaterialCommunityIcons' size={36} color={COLORS.BLUE} />
                <Text style={{ fontWeight: '400', fontSize: 30, color: COLORS.BLACK }}>57</Text>
              </View>
              <View>
                <Text style={{ fontWeight: '400', color: COLORS.BLACK }}>
                  Khoảng cách bước đi
                </Text>
                <Text style={{ fontWeight: '400', color: COLORS.BLACK, fontSize: 20 }}>0,03 <Text style={{ fontWeight: '400', color: COLORS.BLACK, fontSize: 14 }}>km</Text></Text>
                <Text style={{ fontWeight: '400', color: COLORS.BLACK }}>
                  Mức tiêu thụ của bước đi
                </Text>
                <Text style={{ fontWeight: '400', color: COLORS.BLACK, fontSize: 20 }}>5 <Text style={{ fontWeight: '400', color: COLORS.BLACK, fontSize: 14 }}>Kcal</Text></Text>
              </View>
            </View>
          </View>

        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <View>
              <Text style={{ fontSize: FONT_SIZE.HEADER }}>
                {STRINGS.REPORT_TAB.SOME_PRODUCTS_FOR_YOU}
              </Text>
              <View>{/* <HSwipe data={dataRe} /> */}</View>
            </View>
            <HairLine style={{ width: '60%' }} />
            <TouchableOpacity
              style={{ width: '100%', alignItems: 'center' }}
              onPress={() => {
                navigateTo(STRINGS.ROUTE.REPORT_DETAIL);
              }}>
              <Text style={{ marginTop: 8 }}>{STRINGS.REPORT_TAB.SEE_MORE}</Text>
            </TouchableOpacity>
          </View>
        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text style={styles.textTitle}>{STRINGS.REPORT_TAB.SLEEP}</Text>
          </View>
        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text style={styles.textTitle}>{STRINGS.REPORT_TAB.HEART_RATE}</Text>
          </View>
        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text style={styles.textTitle}>{STRINGS.REPORT_TAB.PRACTICE_HISTORY}</Text>
          </View>
        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text style={styles.textTitle}>SpO2</Text>
          </View>
        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text style={styles.textTitle}>{STRINGS.REPORT_TAB.WEIGHT_HEIGHT}</Text>
          </View>
        </Frame>
      </ScrollView>
    </ContainerView>
  );
};

export default OverView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  frame: {
    // height: 300,
  },
  inLineFrame: {
    // backgroundColor: 'gray',
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'column',
  },
  textTarget: {
    fontSize: 55,
    color: 'orange',
  },
  textTitle: {
    fontWeight: '600',
    color: 'black',
  }
});

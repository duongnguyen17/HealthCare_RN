import React, { useState } from 'react';
import {
  RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, DIMENS, FONT_SIZE, STRINGS } from '../../../common';
import ContainerView from '../../../components/ContainerView';
import Frame from '../../../components/Frame';
import HairLine from '../../../components/HairLine';
import { navigateTo } from '../../../navigator/NavigationServices';
import { TabViewProps } from '../../../type/type';

const OverView = ({ }: TabViewProps) => {
  // useFocusEffect(() => { setStatusBarBackground(COLORS.LIGHT_BLUE) })
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isReFresh} onRefresh={onRefresh} />
        }>
        <Frame style={styles.frame}>
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
            <Text>{STRINGS.REPORT_TAB.SLEEP}</Text>
          </View>
        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text>{STRINGS.REPORT_TAB.HEART_RATE}</Text>
          </View>
        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text>{STRINGS.REPORT_TAB.PRACTICE_HISTORY}</Text>
          </View>
        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text>SpO2</Text>
          </View>
        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text>{STRINGS.REPORT_TAB.WEIGHT_HEIGHT}</Text>
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
  frame: { height: 300 },
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

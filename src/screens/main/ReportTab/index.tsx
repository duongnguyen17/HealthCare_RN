import React, { useEffect, useState } from 'react';
import {
  RefreshControl, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, DIMENS, FONT_SIZE, STORAGE_KEY, STRINGS } from '../../../common';
import ContainerView from '../../../components/ContainerView';
import Frame from '../../../components/Frame';
import HairLine from '../../../components/HairLine';
import HIcon from '../../../components/HIcon';
import { navigateTo } from '../../../navigator/NavigationServices';
import { RootStateType, TabViewProps } from '../../../type/type';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Modal from 'react-native-modal';
import { HGoogleFit } from '../../../utils/HGoogleFit';
import Storage from '../../../utils/Storage';
import { useDispatch, useSelector } from 'react-redux';
import { healthAction } from '../../../reduxSaga/slices/healthSlice';
import { useIsFocused } from '@react-navigation/native';

const OverView = ({ }: TabViewProps) => {
  const dispatch = useDispatch()
  const focused = useIsFocused()
  const { isAuthorized, today } = useSelector((state: RootStateType) => state.healthState)
  const _id = useSelector((state: RootStateType) => state.authState._id)
  const [modalVisible, setModalVisible] = useState(false)
  const [isReFresh, setIsReFresh] = useState(false);

  useEffect(() => {
    checkGGFit()
  }, [])

  useEffect(() => {
    if (isAuthorized && focused) {
      dispatch(healthAction.getOverviewToday())
    }
  }, [isAuthorized, focused])

  const checkGGFit = async () => {
    const storage = await Storage.getItem(STORAGE_KEY.USE_GOOGLEFIT + _id)
    if (storage != 1) {
      if (!isAuthorized) { setModalVisible(true) } else {
        await Storage.setItem(STORAGE_KEY.USE_GOOGLEFIT + _id, 1)
      }
    } else {
      if (!isAuthorized) dispatch(healthAction.onAuthorize())
    }
  }

  const onRefresh = () => {
    setIsReFresh(true);
    dispatch(healthAction.getOverviewToday())
  };

  const dataRe = [{}];

  const googlefitAuth = async () => {
    dispatch(healthAction.onAuthorize())
    setModalVisible(false)
  }

  const connectDevice = () => {
    //navigate to device screen
    ToastAndroid.show("Chưa có chức năng này", 1000)
    setModalVisible(false)
  }

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
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>

            <Text style={styles.title_frame}>{STRINGS.REPORT_TAB.FOOT_STEP}</Text>

            <View style={{ marginTop: 20, width: '100%', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
              <View style={{ width: 140, height: 140, justifyContent: 'center', alignItems: 'center' }}>
                <AnimatedCircularProgress
                  style={{ position: 'absolute' }}
                  rotation={0}
                  size={120}
                  width={10}
                  fill={today?.processSteps ?? 0}
                  tintColor={COLORS.BLUE}
                  // onAnimationComplete={() => console.log('onAnimationComplete')}
                  backgroundColor={COLORS.LIGHT_BLUE_1} />
                <HIcon name='shoe-print' font='MaterialCommunityIcons' size={36} color={COLORS.BLUE} />
                <Text style={{ fontWeight: '400', fontSize: 30, color: COLORS.BLACK }}>{today?.steps[2]?.steps[0]?.value}</Text>
              </View>
              <View>
                <Text style={{ fontWeight: '400', color: COLORS.BLACK, fontSize: FONT_SIZE.CONTENT }}>
                  Khoảng cách bước đi
                </Text>
                <Text style={{ fontWeight: '400', color: COLORS.BLACK, fontSize: 20 }}>{today?.distances[0]?.distance.toFixed(2)} <Text style={{ fontWeight: '400', color: COLORS.BLACK, fontSize: 14 }}>m</Text></Text>
                <Text style={{ fontWeight: '400', color: COLORS.BLACK, fontSize: FONT_SIZE.CONTENT }}>
                  Mức tiêu thụ của bước đi
                </Text>
                <Text style={{ fontWeight: '400', color: COLORS.BLACK, fontSize: 20 }}>{today?.calories[0]?.calorie.toFixed(3)} <Text style={{ fontWeight: '400', color: COLORS.BLACK, fontSize: 14 }}>Kcal</Text></Text>
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
            <Text style={styles.title_frame}>{STRINGS.REPORT_TAB.SLEEP}</Text>
            <View style={styles.content_frame}>
              {today?.sleep == undefined || today.sleep.length == 0 ? <Text style={styles.text_nodata}>Không có dữ liệu</Text> : <View></View>}
            </View>
          </View>
        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text style={styles.title_frame}>{STRINGS.REPORT_TAB.HEART_RATE}</Text>
            <View style={styles.content_frame}>
              {today?.heartbeat == undefined || today?.heartbeat.length == 0 ? <Text style={styles.text_nodata}>Không có dữ liệu</Text> : <View></View>}
            </View>
          </View>
        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text style={styles.title_frame}>{STRINGS.REPORT_TAB.PRACTICE_HISTORY}</Text>
            <View style={styles.content_frame}>
              {today?.sleep == undefined ? <Text style={styles.text_nodata}>Không có dữ liệu</Text> : <View></View>}
            </View>
          </View>
        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text style={styles.title_frame}>SpO2</Text>
            <View style={styles.content_frame}>
              {today?.sleep == undefined ? <Text style={styles.text_nodata}>Không có dữ liệu</Text> : <View></View>}
            </View>
          </View>
        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text style={styles.title_frame}>{STRINGS.REPORT_TAB.WEIGHT_HEIGHT}</Text>
            <View style={styles.content_frame}>
              {today?.sleep == undefined ? <Text style={styles.text_nodata}>Không có dữ liệu</Text> : <View></View>}
            </View>
          </View>
        </Frame>
      </ScrollView>
      <Modal onDismiss={() => { }} isVisible={modalVisible} >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.view_modal}>
            <Text style={styles.title_modal}>Chọn phương thức theo dõi sức khỏe</Text>
            <TouchableOpacity style={[styles.button_modal, { backgroundColor: COLORS.LIGHT_BLUE, marginTop: 20 }]}
              onPress={googlefitAuth}
            >
              <Text style={styles.title_button_modal}>Thiết bị này</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button_modal, { backgroundColor: COLORS.LIGHT_ORANGE }]}
              onPress={connectDevice}
            >
              <Text style={styles.title_button_modal}>Thiết bị ngoại vi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ContainerView>
  );
};

export default OverView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  frame: {
    marginHorizontal: 8,
    // alignItems: 'center',
    marginVertical: 10,
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
  title_frame: {
    fontWeight: '600',
    color: 'black',
    marginBottom: 10,
  },
  view_modal: {
    paddingVertical: 24,
    width: '90%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
  },
  title_modal: {
    fontSize: FONT_SIZE.HEADER_TAG,
    color: COLORS.BLACK,
    fontWeight: '500',
    alignSelf: 'center',
  },
  button_modal: {
    marginTop: 10,
    paddingVertical: 10,
    marginHorizontal: 20,
    alignItems: 'center',
    borderRadius: 10
  },
  title_button_modal: {
    color: COLORS.WHITE,
    fontWeight: '500',
    fontSize: FONT_SIZE.CONTENT,
  },
  content_frame: {


  }, text_nodata: {
    alignSelf: 'center',
    color: COLORS.GRAY_TEXT_2,
  },
});

import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppLink from 'react-native-app-link';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import SendIntentAndroid from 'zepp-health-care-hasley';
import {COLORS, DIMENS, FONT_SIZE, STRINGS} from '../../../common';
import {LOGO_ZEPP} from '../../../common/image';
import ContainerView from '../../../components/ContainerView';
import Frame from '../../../components/Frame';
import HairLine from '../../../components/HairLine';
import HIcon from '../../../components/HIcon';
import {navigateTo} from '../../../navigator/NavigationServices';
import {healthAction} from '../../../reduxSaga/slices/healthSlice';
import {RootStateType, TabViewProps} from '../../../type/type';

const OverView = ({}: TabViewProps) => {
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const {isAuthorized, today} = useSelector(
    (state: RootStateType) => state.healthState,
  );
  const goalStep = useSelector(
    (state: RootStateType) => state.userState.customInfor.goalStep,
  );
  console.log('isAuthorized, today', JSON.stringify(today));
  const [isReFresh, setIsReFresh] = useState(false);

  useEffect(() => {
    if (isAuthorized && focused) {
      dispatch(healthAction.getOverviewToday());
    }
    if (!isAuthorized) {
      dispatch(healthAction.onAuthorize());
    }
  }, [isAuthorized, focused]);

  const onRefresh = () => {
    setIsReFresh(true);
    dispatch(healthAction.getOverviewToday());
  };

  const openInStore = () => {
    AppLink.openInStore({
      appName: 'com.huami.watch.hmwatchmanager',
      appStoreId: 1127269366,
      appStoreLocale: 'vn',
      playStoreId: 'com.huami.watch.hmwatchmanager',
    })
      .then(res => {})
      .catch(err => {
        // handle error
      });
  };

  const goZepp = async () => {
    try {
      const result = await SendIntentAndroid.gotoOtherApp(
        'com.huami.watch.hmwatchmanager',
      );
      if (result == false || result == undefined) {
        openInStore();
      }
    } catch (error) {}
  };

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
        start={{x: 0.5, y: 0.25}}
        end={{x: 0, y: 1.0}}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 8,
          marginTop: 4,
          marginBottom: 2,
        }}>
        <View></View>
        <TouchableOpacity
          style={{paddingVertical: 4, paddingHorizontal: 8}}
          activeOpacity={0.7}
          onPress={goZepp}>
          <Image
            source={LOGO_ZEPP}
            style={{
              width: 20,
              height: 20,
              resizeMode: 'center',
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isReFresh} onRefresh={onRefresh} />
        }>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text style={styles.title_frame}>
              {STRINGS.REPORT_TAB.FOOT_STEP}
            </Text>

            <View
              style={{
                marginTop: 20,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  width: 140,
                  height: 140,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AnimatedCircularProgress
                  style={{position: 'absolute'}}
                  rotation={0}
                  size={120}
                  width={10}
                  fill={today?.processSteps ?? 0}
                  tintColor={COLORS.BLUE}
                  // onAnimationComplete={() => console.log('onAnimationComplete')}
                  backgroundColor={COLORS.LIGHT_BLUE_1}
                />
                <HIcon
                  name="shoe-print"
                  font="MaterialCommunityIcons"
                  size={36}
                  color={COLORS.BLUE}
                />
                <Text
                  style={{
                    fontWeight: '400',
                    fontSize: 30,
                    color: COLORS.BLACK,
                  }}>
                  {today?.steps[2]?.steps[0]?.value}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontWeight: '400',
                    color: COLORS.BLACK,
                    fontSize: FONT_SIZE.CONTENT,
                  }}>
                  Khoảng cách bước đi
                </Text>
                <Text
                  style={{
                    fontWeight: '400',
                    color: COLORS.BLACK,
                    fontSize: 20,
                  }}>
                  {today?.distances[0]?.distance.toFixed(2)}{' '}
                  <Text
                    style={{
                      fontWeight: '400',
                      color: COLORS.BLACK,
                      fontSize: 14,
                    }}>
                    m
                  </Text>
                </Text>
                <Text
                  style={{
                    fontWeight: '400',
                    color: COLORS.BLACK,
                    fontSize: FONT_SIZE.CONTENT,
                  }}>
                  Mức tiêu thụ của bước đi
                </Text>
                <Text
                  style={{
                    fontWeight: '400',
                    color: COLORS.BLACK,
                    fontSize: 20,
                  }}>
                  {today?.calories[0]?.calorie.toFixed(3)}{' '}
                  <Text
                    style={{
                      fontWeight: '400',
                      color: COLORS.BLACK,
                      fontSize: 14,
                    }}>
                    Kcal
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </Frame>
        {/* <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <View>
              <Text style={{fontSize: FONT_SIZE.HEADER}}>
                {STRINGS.REPORT_TAB.SOME_PRODUCTS_FOR_YOU}
              </Text>
              <View><HSwipe data={dataRe} /></View>
            </View>
            <HairLine style={{width: '60%'}} />
            <TouchableOpacity
              style={{width: '100%', alignItems: 'center'}}
              onPress={() => {
                navigateTo(STRINGS.ROUTE.REPORT_DETAIL);
              }}>
              <Text style={{marginTop: 8}}>{STRINGS.REPORT_TAB.SEE_MORE}</Text>
            </TouchableOpacity>
          </View>
        </Frame> */}
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text style={styles.title_frame}>{STRINGS.REPORT_TAB.SLEEP}</Text>
            <View style={styles.content_frame}>
              {today?.sleep == undefined || today.sleep.length == 0 ? (
                <Text style={styles.text_nodata}>Không có dữ liệu</Text>
              ) : (
                <View></View>
              )}
            </View>
          </View>
        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text style={styles.title_frame}>
              {STRINGS.REPORT_TAB.HEART_RATE}
            </Text>
            <View style={styles.content_frame}>
              {today?.heartbeat == undefined || today?.heartbeat.length == 0 ? (
                <Text style={styles.text_nodata}>Không có dữ liệu</Text>
              ) : (
                <View></View>
              )}
            </View>
          </View>
        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text style={styles.title_frame}>
              {STRINGS.REPORT_TAB.PRACTICE_HISTORY}
            </Text>
            <View style={styles.content_frame}>
              {today?.sleep == undefined ? (
                <Text style={styles.text_nodata}>Không có dữ liệu</Text>
              ) : (
                <View></View>
              )}
            </View>
          </View>
        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text style={styles.title_frame}>SpO2</Text>
            <View style={styles.content_frame}>
              {today?.sleep == undefined ? (
                <Text style={styles.text_nodata}>Không có dữ liệu</Text>
              ) : (
                <View></View>
              )}
            </View>
          </View>
        </Frame>
        <Frame style={styles.frame}>
          <View style={styles.inLineFrame}>
            <Text style={styles.title_frame}>
              {STRINGS.REPORT_TAB.WEIGHT_HEIGHT}
            </Text>
            <View style={styles.content_frame}>
              {today?.sleep == undefined ? (
                <Text style={styles.text_nodata}>Không có dữ liệu</Text>
              ) : (
                <View></View>
              )}
            </View>
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
    borderRadius: 10,
  },
  title_button_modal: {
    color: COLORS.WHITE,
    fontWeight: '500',
    fontSize: FONT_SIZE.CONTENT,
  },
  content_frame: {},
  text_nodata: {
    alignSelf: 'center',
    color: COLORS.GRAY_TEXT_2,
  },
});

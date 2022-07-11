import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import {BucketUnit} from 'react-native-google-fit';
import {Avatar} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {
  COLORS,
  DIMENS,
  FONT_SIZE,
  IMG_DEFAULT_AVATAR,
  STORAGE_KEY,
  STRINGS,
} from '../../../common';
import ContainerView from '../../../components/ContainerView';
import Frame from '../../../components/Frame';
import HairLine from '../../../components/HairLine';
import HIcon from '../../../components/HIcon';
import {navigateTo} from '../../../navigator/NavigationServices';
import {authAction} from '../../../reduxSaga/slices/authSlice';
import {healthAction} from '../../../reduxSaga/slices/healthSlice';
import {userAction} from '../../../reduxSaga/slices/userSlice';
import {RootStateType} from '../../../type/type';
import HGoogleCalendar from '../../../utils/HGoogleCalendar';
import {HGoogleFit} from '../../../utils/HGoogleFit';
import Storage from '../../../utils/Storage';
const Profile = (prop: ViewProps) => {
  const isFocused = useIsFocused();
  const {isAuthorized} = useSelector(
    (state: RootStateType) => state.healthState,
  );
  const RBSheetRefAccount = useRef<any>();
  const RBSheetRefHMM = useRef<any>();
  const {avatar, username} = useSelector(
    (state: RootStateType) => state.userState.customInfor,
  );
  const _id = useSelector((state: RootStateType) => state.authState._id);
  const dispatch = useDispatch();
  useEffect(() => {
    isFocused && dispatch(userAction.getUserProfile());
  }, [isFocused]);

  const logout = () => {
    dispatch(authAction.logout());
  };

  const googleSheetAuth = () => {
    HGoogleCalendar.handleAuthClick();
  };

  const gotoProfileScreen = () => {
    navigateTo(STRINGS.ROUTE.PROFILE);
  };

  /**
   * choose GoogleFit monitoring health
   */
  const chooseGF = async () => {
    dispatch(healthAction.checkAuthorize());
    if (!isAuthorized) {
      dispatch(healthAction.onAuthorize());
    }
    await Storage.setItem(STORAGE_KEY.USE_GOOGLEFIT + _id, 1);
    RBSheetRefHMM.current.close();
  };

  /**
   * choose other device monitoring health
   */
  const chooseOtherDevice = async () => {
    await Storage.setItem(STORAGE_KEY.USE_GOOGLEFIT + _id, 0);
    RBSheetRefHMM.current.close();
  };

  const listVisited = () => {
    navigateTo(STRINGS.ROUTE.LIST_VISITED_SCREEN);
  };

  const listMedicine = () => {
    navigateTo(STRINGS.ROUTE.LIST_MEDICINE_SCREEN);
  };

  const testGGFit = () => {
    // HGoogleFit.authorize()

    // HGoogleFit.disconnect()
    // HGoogleFit.openFit()
    // HGoogleFit.getAllActivities()
    HGoogleFit.getDailyDistanceSamples({
      startDate: '2022-06-20T19:16:09.175Z', // required
      endDate: '2022-06-21T19:16:09.175Z', // required
      bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
      bucketInterval: 1, // optional - default 1.
    });

    // HGoogleFit.getMoveMinutes({
    //   startDate: "2022-06-20T19:16:09.175Z", // required
    //   endDate: "2022-06-21T19:16:09.175Z", // required
    //   bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
    //   bucketInterval: 1, // optional - default 1.
    // })

    // HGoogleFit.getDailyStepCountSamples({
    //   startDate: "2022-06-20T19:16:09.175Z", // required
    //   endDate: "2022-06-21T19:16:09.175Z", // required
    //   bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
    //   bucketInterval: 1, // optional - default 1.
    // })
    // HGoogleFit.observeSteps()
  };

  return (
    <ContainerView style={{backgroundColor: COLORS.BACKGROUND}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{marginHorizontal: 8}}
        showsVerticalScrollIndicator={false}>
        <Section>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={gotoProfileScreen}>
              <Avatar.Image
                style={{
                  backgroundColor: COLORS.WHITE,
                  shadowRadius: 5,
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.3,
                  elevation: 5,
                }}
                source={
                  avatar == '' || avatar == null
                    ? IMG_DEFAULT_AVATAR
                    : {uri: avatar}
                }
                size={72}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: COLORS.BLACK,
                  marginTop: 4,
                }}>
                {username}
              </Text>
            </TouchableOpacity>
          </View>
        </Section>
        <Section title="Ghi chú">
          <FrameButton
            buttons={[
              {title: 'Danh sách nhật kí khám bệnh', onPress: listVisited},
              {title: 'Danh sách các thuốc đã uống', onPress: listMedicine},
              {title: 'Tạo nhật kí khám bệnh', onPress: listVisited},
              {title: 'Thêm thuốc', onPress: listVisited},
            ]}
          />
        </Section>
        <Section title="Thiết bị của tôi">
          <FrameButton
            buttons={[{title: 'Vòng đeo tay ', onPress: testGGFit}]}
          />
        </Section>
        <Section title="Google- Microsoft">
          <FrameButton
            buttons={[
              {
                title: 'Thêm tài khoản',
                onPress: () => {
                  RBSheetRefAccount.current.open();
                },
              },
            ]}
          />
        </Section>
        <Section title="Thêm">
          <FrameButton
            buttons={[
              {title: 'Đặt mục tiêu', onPress: () => {}},
              {
                title: 'Thay đổi phương thức theo dõi sức khỏe',
                onPress: () => {
                  RBSheetRefHMM.current.open();
                },
              },
              {
                title: 'Cài đặt',
                onPress: () => {},
              },
            ]}
          />
        </Section>
        <Section>
          <FrameButton buttons={[{title: 'Đăng xuất', onPress: logout}]} />
        </Section>
      </ScrollView>
      <RBSheet
        ref={RBSheetRefAccount}
        height={2 * DIMENS.BUTTON_RBSHEET_HEIGHT}
        openDuration={250}>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          onPress={googleSheetAuth}>
          <Text style={{color: COLORS.BLACK, fontSize: FONT_SIZE.HEADER_TAG}}>
            Google
          </Text>
        </TouchableOpacity>
        <HairLine style={{width: '90%', backgroundColor: 'black'}} />
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: COLORS.BLACK, fontSize: FONT_SIZE.HEADER_TAG}}>
            Microsoft
          </Text>
        </TouchableOpacity>
      </RBSheet>
      <RBSheet
        ref={RBSheetRefHMM}
        openDuration={250}
        height={2 * DIMENS.BUTTON_RBSHEET_HEIGHT}>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          onPress={chooseGF}>
          <Text style={{color: COLORS.BLACK, fontSize: FONT_SIZE.HEADER_TAG}}>
            Thiết bị này
          </Text>
        </TouchableOpacity>
        <HairLine style={{width: '90%', backgroundColor: 'black'}} />
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          onPress={chooseOtherDevice}>
          <Text style={{color: COLORS.BLACK, fontSize: FONT_SIZE.HEADER_TAG}}>
            Thiết bị ngoại vi
          </Text>
        </TouchableOpacity>
      </RBSheet>
    </ContainerView>
  );
};

const Section = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section_container}>
    {title ? (
      <Text style={{marginBottom: 12, color: COLORS.BLACK, fontWeight: '500'}}>
        {title}
      </Text>
    ) : null}
    {children}
  </View>
);

const FrameButton = ({
  buttons,
}: {
  buttons: Array<{title: string; onPress: () => void}>;
}) => (
  <Frame>
    {buttons.map((item, index) => (
      <View key={index}>
        {index === 0 ? null : <HairLine style={{width: '90%'}} />}
        <TouchableOpacity
          onPress={item.onPress}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 14,
          }}>
          <Text style={{color: COLORS.BLACK}}>{item.title}</Text>
          <HIcon name="right" font="AntDesign" size={18} />
        </TouchableOpacity>
      </View>
    ))}
  </Frame>
);

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section_container: {
    marginTop: 30,
    paddingHorizontal: 4,
  },
});

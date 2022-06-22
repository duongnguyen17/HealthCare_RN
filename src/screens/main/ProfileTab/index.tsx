import React, { useEffect, useRef } from 'react';
import { StyleSheet, ViewProps, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { BucketUnit } from 'react-native-google-fit';
import { Avatar } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, FONT_SIZE, IMG_DEFAULT_AVATAR } from '../../../common';
import ContainerView from '../../../components/ContainerView';
import Frame from '../../../components/Frame';
import HairLine from '../../../components/HairLine';
import HIcon from '../../../components/HIcon';
import { authAction } from '../../../reduxSaga/slices/authSlice';
import { userAction } from '../../../reduxSaga/slices/userSlice';
import { RootStateType } from '../../../type/type';
import HGoogleCalendar from '../../../utils/HGoogleCalendar';
import { HGoogleFit } from '../../../utils/HGoogleFit';
const Profile = (prop: ViewProps) => {
  const RBSheetRefAccount = useRef<any>()
  const user = useSelector((state: RootStateType) => state.userState.profile)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userAction.getUserProfile())
  }, [])

  const logout = () => {
    dispatch(authAction.logout())
  }

  const googleSheetAuth = () => {
    HGoogleCalendar.handleAuthClick()
  }

  const testGGFit = () => {
    // HGoogleFit.authorize()

    // HGoogleFit.disconnect()
    // HGoogleFit.openFit()
    // HGoogleFit.getAllActivities()
    HGoogleFit.getDailyDistanceSamples({
      startDate: "2022-06-20T19:16:09.175Z", // required
      endDate: "2022-06-21T19:16:09.175Z", // required
      bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
      bucketInterval: 1, // optional - default 1. 
    })

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
  }

  return (
    <ContainerView style={{ backgroundColor: COLORS.BACKGROUND }}>
      <ScrollView style={styles.container} contentContainerStyle={{ marginHorizontal: 8, flex: 1 }}>
        <Section>
          <View style={{ alignItems: 'center' }}>
            <Avatar.Image style={{
              backgroundColor: COLORS.WHITE, shadowRadius: 5,
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.3,
              elevation: 5
            }} source={(user?.avatar == "" || user?.avatar == null) ? IMG_DEFAULT_AVATAR : { uri: user?.avatar }} size={72} />
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: COLORS.BLACK, marginTop: 4 }}>{user?.username}</Text>
          </View>
        </Section>
        <Section title='Thiết bị của tôi'>
          <FrameButton buttons={[{ title: "Vòng đeo tay ", onPress: testGGFit }]} />
        </Section>
        <Section title='Google- Microsoft'>
          <FrameButton buttons={[{
            title: "Thêm tài khoản", onPress: () => {
              RBSheetRefAccount.current.open()
            }
          }]} />
        </Section>
        <Section title='Thêm'>
          <FrameButton buttons={[{ title: "Đặt mục tiêu", onPress: () => { } }, { title: 'Cài đặt', onPress: () => { } }]} />
        </Section>
        <Section>
          <FrameButton buttons={[{ title: 'Đăng xuất', onPress: logout }]} />
        </Section>
      </ScrollView>
      <RBSheet ref={RBSheetRefAccount} height={120} openDuration={250}>
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={googleSheetAuth}>
          <Text style={{ color: COLORS.BLACK, fontSize: FONT_SIZE.HEADER_TAG }}>Google</Text>
        </TouchableOpacity>
        <HairLine style={{ width: '90%', backgroundColor: 'black' }} />
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: COLORS.BLACK, fontSize: FONT_SIZE.HEADER_TAG }}>Microsoft</Text>
        </TouchableOpacity>
      </RBSheet>
    </ContainerView>
  );
};


const Section = ({ title, children }: { title?: string, children: React.ReactNode }) => (
  <View style={styles.section_container}>
    {title ? <Text style={{ marginBottom: 12, color: COLORS.BLACK, fontWeight: '500' }}>{title}</Text> : null}
    {children}
  </View>
)

const FrameButton = ({ buttons }: { buttons: Array<{ title: string, onPress: () => void }> }) => (
  <Frame>
    {buttons.map((item, index) => (
      <View key={index}>
        {index === 0 ? null : <HairLine style={{ width: '90%' }} />}
        <TouchableOpacity onPress={item.onPress} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14 }}>
          <Text style={{ color: COLORS.BLACK }}>{item.title}</Text>
          <HIcon name='right' font='AntDesign' size={18} />
        </TouchableOpacity>
      </View>
    ))}
  </Frame>
)

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

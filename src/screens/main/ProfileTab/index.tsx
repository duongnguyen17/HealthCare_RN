import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ViewProps, Button } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../../reduxSaga/slices/authSlice';
import { healthAction } from '../../../reduxSaga/slices/healthSlice';
import { RootStateType } from '../../../type/type';
import { HGoogleFit } from '../../../utils/GoogleFit';
const Profile = (prop: ViewProps) => {

  const dispatch = useDispatch()
  const isAuth = useSelector((state: RootStateType) => state.healthState.isAuthorize)
  // const timeSchedule = new Date(Date.now() + 3 * 2000)
  // const notify = useCallback(() => {

  //   // PushNotification.localNotificationSchedule({
  //   //   //... You can use all the options from localNotifications
  //   //   id: 2, vibrate: true, vibration: 300,
  //   //   message: "My Notification Message", // (required)
  //   //   date: timeSchedule, // in 60 secs
  //   //   allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
  //   //   playSound: true,
  //   //   timeoutAfter: 30000,
  //   //   channelId: 'meidicineChannelId',

  //   //   /* Android Only Properties */

  //   //   // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
  //   // });
  //   PushNotification.localNotificationSchedule({
  //     id: 3,
  //     vibrate: true,
  //     vibration: 300,
  //     message: "My Notification Message 22", // (required)
  //     date: timeSchedule, // in 60 secs
  //     allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
  //     playSound: true,
  //     timeoutAfter: 30000,
  //     channelId: 'meidicineChannelId',
  //   })
  // }, [])

  const testAuth = () => {
    dispatch(healthAction.onAuthorize())
  }

  const testIsAuth = () => {
    dispatch(healthAction.checkAuthorize())
  }

  const logout = () => {
    dispatch(authAction.logout())
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>{isAuth}</Text>
      <Button title='Test auth' onPress={testAuth} />
      <Button title='Test isAuth' onPress={testIsAuth} />
      <Button title='Logout' onPress={logout} />
    </SafeAreaView>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

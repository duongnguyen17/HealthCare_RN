import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ViewProps, Button } from 'react-native';
import PushNotification from 'react-native-push-notification';
const Profile = (prop: ViewProps) => {
  const timeSchedule = new Date(Date.now() + 3 * 2000)
  const notify = useCallback(() => {

    // PushNotification.localNotificationSchedule({
    //   //... You can use all the options from localNotifications
    //   id: 2, vibrate: true, vibration: 300,
    //   message: "My Notification Message", // (required)
    //   date: timeSchedule, // in 60 secs
    //   allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
    //   playSound: true,
    //   timeoutAfter: 30000,
    //   channelId: 'meidicineChannelId',

    //   /* Android Only Properties */

    //   // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    // });
    PushNotification.localNotificationSchedule({
      id: 3,
      vibrate: true,
      vibration: 300,
      message: "My Notification Message 22", // (required)
      date: timeSchedule, // in 60 secs
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      playSound: true,
      timeoutAfter: 30000,
      channelId: 'meidicineChannelId',
    })
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <Text>Tab thông tin cá nhân</Text>
      <Button title='Test notification' onPress={notify} />
    </SafeAreaView>
  );
};

export default Profile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

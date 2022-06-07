/**
 * @format
 */

import { AppRegistry } from 'react-native';

import PushNotification, { Importance } from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios'
import App from './App';
import { name as appName } from './app.json';
import { navigationAvailbe } from './src/navigator/NavigationServices';
import Storage from './src/utils/Storage';
import { CHANNEL_ID, CHANNEL_NAME, STRINGS } from './src/common';

PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
        console.log("TOKEN:", token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);

        // process the notification
        const notify = notification.action ? notification : notification.data;

        NotificationEventHandle(notify);

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: true,
})

/**
 * Handle event and navigate to screen
 * @param {*} notify must have format { action, object }
 */
const NotificationEventHandle = (notify) => {
    if (!navigationAvailbe()) {
        Storage.setItem(STRINGS.STORAGE_KEY.OPENED_NOTIFICATION, notify);
        return;
    }
    console.log('NotificationEventHandle', notify)

    switch (notify.action) {

    }
}

PushNotification.createChannel(
    {
        channelId: CHANNEL_ID.MEDICINE,
        channelName: CHANNEL_NAME.MEDICINE,
        channelDescription: "A channel to categorise medicine notifications",
        playSound: true,
        soundName: "default",
        importance: Importance.HIGH,
        vibrate: true,
    },
    (created) => console.log(`createChannel returned '${created}'`)
);

AppRegistry.registerComponent(appName, () => App);

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ColorValue,
  ImageSourcePropType,
} from 'react-native';

import {hideAlert} from './index';
import {AlertType, COLORS, DIMENS} from '../../common';
import style from '../CustomCalendar/calendar/header/style';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const MyStatusBar = ({backgroundColor, ...props}: MyStatusBarProps) => {
  return (
    <View style={[styles.statusBar, {backgroundColor}]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
};

export default function AlertView({
  message = '',
  color,
  icon,
  cancelable = false,
}: AlertViewProps) {
  let line = Math.floor(message.length / 44) + 1;
  return (
    <View
      style={{
        width: DIMENS.SCREEN_WIDTH - 20,
        left: 10,
        position: 'absolute',
        zIndex: 999,
      }}>
      {/* @ts-ignore */}
      {/* <MyStatusBar backgroundColor={color} barStyle="light-content" /> */}
      {cancelable ? (
        <TouchableOpacity
          style={[
            styles.container,
            {
              backgroundColor: color,
              height: 24 + 24 * line,
            },
          ]}
          onPress={() => {
            hideAlert();
          }}>
          <View style={styles.contentcontainer}>
            {/* @ts-ignore */}
            <Image style={styles.icon} source={icon}></Image>
            <Text numberOfLines={3} style={styles.message}>
              {message}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View
          style={[
            styles.container,
            {
              backgroundColor: color,
              height: 12 + 24 * line,
            },
          ]}>
          <View style={styles.contentcontainer}>
            {/* @ts-ignore */}
            <Image style={styles.icon} source={icon}></Image>
            <Text numberOfLines={3} style={styles.message}>
              {message}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    width: '100%',
    marginTop: DIMENS.STATUS_BAR_HEIGHT,
  },
  contentcontainer: {
    flexDirection: 'row',
    marginRight: 16,
    marginLeft: 16,
    marginVertical: 6,
  },
  icon: {
    height: 24,
    width: 24,
  },
  message: {
    marginLeft: 8,
    width: DIMENS.SCREEN_WIDTH - 64,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: COLORS.WHITE,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
interface MyStatusBarProps {
  backgroundColor: ColorValue;
}
interface AlertViewProps {
  type: AlertType;
  message?: string;
  icon: ImageSourcePropType | null;
  color: ColorValue;
  cancelable: boolean;
}

import React from 'react';
import {
  ColorValue, Image, ImageSourcePropType, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { AlertType, COLORS, DIMENS } from '../../../common';


const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const MyStatusBar = ({ backgroundColor, ...props }: MyStatusBarProps) => {
  return (
    <View style={[styles.statusBar, { backgroundColor }]}>
      <SafeAreaView>
        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
      </SafeAreaView>
    </View>
  );
};

export default function AlertView({
  message,
  color,
  icon,
  onPress = () => { },
}: AlertViewProps) {
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
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: color,
          },
        ]}
        onPress={onPress}
      >
        <View style={styles.contentcontainer}>
          {/* @ts-ignore */}
          <Image style={styles.icon} source={icon}></Image>
          <Text numberOfLines={3} style={styles.message}>
            {message}
          </Text>
        </View>
      </TouchableOpacity>
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
    marginHorizontal: 4,
    marginVertical: 8,
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
export interface AlertViewProps {
  message: string;
  icon?: ImageSourcePropType | null;
  color?: ColorValue;
  onPress?: () => void;
}

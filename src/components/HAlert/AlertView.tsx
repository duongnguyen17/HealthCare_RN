import React, { useEffect, useRef } from 'react';
import {
  Animated, ColorValue, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import { AlertType, COLORS, DIMENS, TIMING } from '../../common';
import { hideAlert } from './index';


export default function AlertView({
  message = '',
  color,
  icon,
  slide,
  cancelable = false,
}: AlertViewProps) {
  let height = 48 + 24 * Math.floor(message.length / 44);
  const translateY = useRef(
    new Animated.Value(-height - DIMENS.STATUS_BAR_HEIGHT),
  ).current;
  useEffect(() => {
    slide ? m_show() : m_hide();
  }, [slide]);

  const m_show = () => {
    Animated.timing(translateY, {
      duration: TIMING.HEADER_ALERT_SLIDE,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };
  const m_hide = () => {
    Animated.timing(translateY, {
      duration: TIMING.HEADER_ALERT_SLIDE,
      toValue: -height - DIMENS.STATUS_BAR_HEIGHT,
      useNativeDriver: true,
    }).start(() => {
      hideAlert();
    });
  };
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
      <Animated.View style={{ transform: [{ translateY }] }}>
        {cancelable ? (
          <TouchableOpacity
            style={[
              styles.container,
              {
                backgroundColor: color,
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
      </Animated.View>
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
    height: DIMENS.STATUS_BAR_HEIGHT,
  },
});
interface AlertViewProps {
  slide: Boolean;
  type: AlertType;
  message?: string;
  icon: ImageSourcePropType | null;
  color: ColorValue;
  cancelable: boolean;
}

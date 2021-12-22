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
import {AlertType, width} from '../../common';

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
  type,
  message = '',
  cancelable = false,
}: AlertViewProps) {
  const [color, setColor] = useState<ColorValue>('#fff');
  const [icon, setIcon] = useState<ImageSourcePropType>();
  let line = Math.floor(message.length / 44) + 1;

  useEffect(() => {
    switch (type) {
      case AlertType.SUCCESS:
        setIcon(require('./assets/short_right.png'));
        setColor('#0FD186');
        break;
      case AlertType.WARN:
        setIcon(require('./assets/short_right1.png'));
        setColor('#FFAA38');
        break;
      case AlertType.FAIL:
        setIcon(require('./assets/short_down.png'));
        setColor('#FF4D4D');
        break;
      default:
        break;
    }
  }, [type]);
  return (
    <View style={{flex: 1, position: 'absolute', zIndex: 999}}>
      {/* @ts-ignore */}
      <MyStatusBar backgroundColor={color} barStyle="light-content" />
      {cancelable ? (
        <TouchableOpacity
          style={{
            width: width,
            backgroundColor: color,
            height: 24 + 24 * line,
          }}
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
          style={{
            width: width,
            backgroundColor: color,
            height: 12 + 24 * line,
          }}>
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
  container: {},
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
    width: width - 64,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: '#FFFFFF',
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
  cancelable: boolean;
}

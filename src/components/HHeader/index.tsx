import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {getStatusBarHeight} from '../../utils/IPhoneXHelper';
import LinearGradient from 'react-native-linear-gradient';
import HIcon from '../HIcon';
import {FONT_SIZE} from '../../common';
const HHeader = ({hasLinear = true, children}: HHeaderProps) => {
  const statusBarHeight = getStatusBarHeight(true);
  return (
    <View
      style={{
        width: '100%',
        height: statusBarHeight + 40,
        // borderBottomWidth: StyleSheet.hairlineWidth,
      }}>
      {hasLinear && (
        <LinearGradient
          style={{
            height: statusBarHeight + 40,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 0,
          }}
          colors={['#e6f2ff', '#ffffff']}
          start={{x: 0.5, y: 0.25}}
          end={{x: 0, y: 0}}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 10,
          marginTop: statusBarHeight,
          height: 40,
          alignItems: 'center',
          justifyContent: 'space-between',
          //   backgroundColor: 'gray',
        }}>
        {children}
      </View>
    </View>
  );
};
export default HHeader;
interface HHeaderProps {
  hasLinear?: boolean;
  children?: React.ReactNode;
}

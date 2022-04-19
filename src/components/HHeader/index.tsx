import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {getStatusBarHeight} from '../../utils/IPhoneXHelper';
import LinearGradient from 'react-native-linear-gradient';
import HIcon from '../HIcon';
import {COLORS, FONT_SIZE,DIMENS} from '../../common';
const HHeader = ({hasLinear = true, children}: HHeaderProps) => {
  const statusBarHeight = getStatusBarHeight(true);
  return (
    <View
      style={{
        width: '100%',
        minHeight: DIMENS.HEADER_STATUS_BAR_HEIGHT,
        zIndex: 999,
        // borderBottomWidth: StyleSheet.hairlineWidth,
      }}>
      {hasLinear && (
        <LinearGradient
          style={{
            height: DIMENS.HEADER_STATUS_BAR_HEIGHT,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 0,
          }}
          colors={[COLORS.LIGHT_BLUE, COLORS.WHITE]}
          // start={{x: 0.5, y: 0.25}}
          // end={{x: 0, y: -0.5}}
        />
      )}
      <View
        style={{
          flexDirection: 'row',
          marginTop: statusBarHeight,
          height: DIMENS.HEADER_HEIGHT,
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
  /**
   * hiện backgroundColor là LinearGradient
   */
  hasLinear?: boolean;
  children?: React.ReactNode;
}

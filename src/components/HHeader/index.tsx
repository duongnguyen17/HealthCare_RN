import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, DIMENS } from '../../common';
const HHeader = ({ hasLinear = true, children, style }: HHeaderProps) => {
  return (
    <View
      style={[{
        width: '100%',
        zIndex: 999,
        // borderBottomWidth: StyleSheet.hairlineWidth,
      }, style]} >
      {
        hasLinear && (
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
        )
      }
      {
        !!children && (
          // <View
          //   style={{
          //     flexDirection: 'row',
          //     marginHorizontal: 10,
          //     height: DIMENS.HEADER_HEIGHT,
          //     alignItems: 'center',
          //     justifyContent: 'space-between',
          //     //   backgroundColor: 'gray',
          //   }}>
          children
          // </View>
        )
      }
    </View >
  );
};
export default HHeader;
interface HHeaderProps {
  /**
   * hiện backgroundColor là LinearGradient
   */
  hasLinear?: boolean;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>
}

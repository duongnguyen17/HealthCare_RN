import React from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import HHeader from '.';
import { COLORS, DIMENS, FONT_SIZE, ICON_SIZE } from '../../common';
import { goBack } from '../../navigator/NavigationServices';
import HIcon from '../HIcon';
const HeaderCommon = ({
  renderLeft,
  renderRight,
  renderTitle,
  onPressLeftIcon,
  title = '',
  hasLinear = false,
  style
}: HeaderOfAddScreenProps) => {

  const m_onPressLeftIcon = onPressLeftIcon ?? goBack;
  return (
    <HHeader hasLinear={hasLinear} style={[styles.container, style]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
        }}>
        <View>
          {!renderLeft ? (
            <TouchableOpacity
              onPress={m_onPressLeftIcon}
              style={{
                paddingStart: 16,
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <HIcon
                font="MaterialIcons"
                name="arrow-back-ios"
                size={ICON_SIZE.HEADER}
              />
            </TouchableOpacity>
          ) : (
            renderLeft()
          )}
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          {!renderTitle ? (
            <Text style={{ fontSize: FONT_SIZE.HEADER, alignSelf: 'center' }}>
              {title}
            </Text>
          ) : (
            renderTitle()
          )}
        </View>
        <View style={{ marginHorizontal: 8 }}>{!renderRight ? <View /> : renderRight()}</View>
      </View>
    </HHeader>
  );
};
export default HeaderCommon;

const styles = StyleSheet.create({
  container: {
    minHeight: DIMENS.HEADER_STATUS_BAR_HEIGHT,
    backgroundColor: COLORS.WHITE,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    elevation: 3
  },
})
interface HeaderOfAddScreenProps {
  onPressLeftIcon?: () => void;
  title?: string;
  renderLeft?: () => React.ReactNode;
  renderRight?: () => React.ReactNode;
  renderTitle?: () => React.ReactNode;
  hasLinear?: boolean;
  style?: StyleProp<ViewStyle>
  // navigation?: NavigationProp<any, any>;
}

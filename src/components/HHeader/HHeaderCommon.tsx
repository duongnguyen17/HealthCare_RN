import React from 'react';
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
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
    <HHeader hasLinear={hasLinear} style={[{ minHeight: DIMENS.HEADER_STATUS_BAR_HEIGHT, backgroundColor: COLORS.WHITE }, style]}>
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
                paddingEnd: 8,
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
        <View>
          {!renderTitle ? (
            <Text style={{ fontSize: FONT_SIZE.HEADER, alignSelf: 'center' }}>
              {title}
            </Text>
          ) : (
            renderTitle()
          )}
        </View>
        <View style={{ marginEnd: 8 }}>{!renderRight ? <View /> : renderRight()}</View>
      </View>
    </HHeader>
  );
};
export default HeaderCommon;
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

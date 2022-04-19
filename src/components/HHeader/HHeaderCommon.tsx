import React from 'react';
import HHeader from '.';
import {Text, View, TouchableOpacity} from 'react-native';
import HIcon from '../HIcon';
import {FONT_SIZE, ICON_SIZE} from '../../common';
import {NavigationProp} from '@react-navigation/native';
const HeaderCommon = ({
  renderLeft,
  renderRight,
  renderTitle,
  onPressLeftIcon,
  navigation,
  title = '',
  hasLinear = false,
}: HeaderOfAddScreenProps) => {
  const goBack = () => {
    navigation?.goBack();
  };
  const m_onPressLeftIcon = onPressLeftIcon ?? goBack;
  return (
    <HHeader hasLinear={hasLinear}>
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
                paddingLeft: 10,
                paddingVertical: 8,
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
        <View >
          {!renderTitle ? (
            <Text style={{fontSize: FONT_SIZE.HEADER, alignSelf: 'center'}}>
              {title}
            </Text>
          ) : (
            renderTitle()
          )}
        </View>
        <View style={{marginEnd: 10}}>{!renderRight ? <View /> : renderRight()}</View>
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
  navigation?: NavigationProp<any, any>;
}

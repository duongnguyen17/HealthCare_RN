import React, {memo, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {COLORS, Location, STRINGS} from '../../../common';
import HIcon from '../../../components/HIcon';
import {navigateTo} from '../../../navigator/NavigationServices';
import {getLocation} from '../../../realm/controllers/location.controller';

export const LocationItem = ({_id, onPress}: any) => {
  const [location, setLocation] = useState<Location>();

  useEffect(() => {
    if (_id != undefined) _getLocation(_id);
  }, [_id]);

  const _getLocation = async (_id: number) => {
    const locationTemp = await getLocation(_id);
    //@ts-ignore
    setLocation(locationTemp);
  };

  const gotoListLocationScreen = () => {
    navigateTo(STRINGS.ROUTE.LIST_LOCATION_SCREEN, {onPress});
  };
  const colorText = location?.name ? COLORS.BLACK : COLORS.GRAY_DECOR;
  return (
    <TouchableOpacity
      style={{flexDirection: 'row', justifyContent: 'space-between'}}
      onPress={gotoListLocationScreen}>
      <Text>Địa điểm</Text>
      <View
        style={{
          flex: 1,
          marginHorizontal: 5,
          alignItems: 'center',
        }}>
        <Text>
          <Text style={{color: colorText}}>{location?.name ?? 'Không có'}</Text>
        </Text>
      </View>
      <HIcon font="MaterialIcons" name="arrow-forward-ios" size={18} />
    </TouchableOpacity>
  );
};

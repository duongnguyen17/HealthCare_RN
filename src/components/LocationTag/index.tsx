import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONT_SIZE, Location, Medicine, STRINGS} from '../../common';
import {navigateTo} from '../../navigator/NavigationServices';

const LocationTag = ({data, onPressItem}: MedicineTagProps) => {
  const onPress = () => {
    //@ts-ignore
    if (onPressItem !== undefined) onPressItem(data._id);
    else {
      gotoLocationScreen();
    }
  };
  const gotoLocationScreen = () => {
    navigateTo(STRINGS.ROUTE.LOCATION_SCREEN, {_id: data._id});
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={styles.title}>{data?.name}</Text>
    </TouchableOpacity>
  );
};

export default LocationTag;
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.LIGHT_BLUE_1,
    flex: 1,
    marginTop: 10,
    borderRadius: 6,
    padding: 10,
  },
  title: {
    fontSize: FONT_SIZE.TITLE,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  note: {},
});
interface MedicineTagProps {
  data: Location;
  onPressItem?: () => void;
}

export interface DataTagType {
  date: Date;
  event: [];
}

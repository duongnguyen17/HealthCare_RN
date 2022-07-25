import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  COLORS,
  FONT_SIZE,
  Medicine,
  STRINGS,
  Visited,
  VisitedItemDisplay,
} from '../../common';
import {navigateTo} from '../../navigator/NavigationServices';
import {showDate, showDateTime} from '../../utils/dateutils';

const VisitedTag = ({data, onPressItem}: VisitedTagProps) => {
  const onPress = () => {
    if (onPressItem !== undefined) onPressItem(data._id);
    else navigateTo(STRINGS.ROUTE.DIARY.VISITED, {_id: data._id});
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={styles.title}>{data?.title}</Text>
      <Text style={styles.note}>{showDateTime(data?.date)}</Text>
      <Text style={styles.note}>
        {data?.location?.name ?? 'Không lưu địa điểm'}
      </Text>
      <Text style={styles.note}>{data?.descript}</Text>
    </TouchableOpacity>
  );
};

export default VisitedTag;
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
interface VisitedTagProps {
  data: VisitedItemDisplay;
  onPressItem?: (_id: number) => void;
}

export interface DataTagType {
  date: Date;
  event: [];
}

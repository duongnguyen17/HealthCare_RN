import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  ACTIVE_OPACITY,
  COLORS,
  EventType,
  FONT_SIZE,
  HEventMedicine,
  HEventVisited,
  STRINGS
} from '../../common';
import { navigateTo } from '../../navigator/NavigationServices';
import { getHoursMinutes } from '../../utils/dateutils';

export const EventTag = memo(({ data }: TaskTagProps) => {

  const navigateToDetail = () => {
    if (data.type == EventType.MEDICINE)
      navigateTo(STRINGS.ROUTE.DIARY.MEDICINE, { _id: data._id })
    else
      navigateTo(STRINGS.ROUTE.DIARY.VISITED, { _id: data._id })
  }

  return (
    <TouchableOpacity
      style={StyleSheet.flatten([
        styles.container,
        {
          // @ts-ignore
          borderColor: COLORS.EVENT_TAG[data?.type].borderColor,
          // @ts-ignore
          backgroundColor: COLORS.EVENT_TAG[data?.type].backgroundColor,
        }])}
      activeOpacity={ACTIVE_OPACITY}
      onPress={navigateToDetail}>
      <View style={styles.container_content}>
        <Text
          style={StyleSheet.flatten([
            styles.text_title,
            {
              // @ts-ignore
              color: COLORS.EVENT_TAG[data?.type].textColor,
            },
          ])}>
          {data?.title}
        </Text>
        {/* {data.type == EventType.MEDICINE ? (
          <Text style={{fontSize: FONT_SIZE.TINY, color: COLORS.GRAY_TEXT_2}}>
            {data?.visited?.title}
          </Text>
        ) : null} */}
        <Text
          style={StyleSheet.flatten([
            styles.text_descript,
            {
              // @ts-ignore
              color: COLORS.EVENT_TAG[data?.type].textColor,
            },
          ])}>
          {data.type == EventType.MEDICINE ? data?.amount : data?.location}
        </Text>
        <Text
          style={StyleSheet.flatten([
            styles.text_descript,
            {
              // @ts-ignore
              color: COLORS.EVENT_TAG[data?.type].textColor,
            },
          ])}>
          {data?.descript}
        </Text>
      </View>
      <View style={styles.container_time}>
        {/* @ts-ignore */}
        <Text style={{ color: COLORS.EVENT_TAG[data?.type].textColor }}>
          {data.type == EventType.MEDICINE
            ? getHoursMinutes(data?.time)
            : getHoursMinutes(data?.date)}
        </Text>
      </View>
    </TouchableOpacity>
  );
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginBottom: 7,
    borderRadius: 10,
    borderWidth: 1,
    padding: 7,
    zIndex: 1,
  },
  container_time: {
    // flex: 1,
    // alignItems: 'center',
  },
  container_text: {
    flex: 5,
  },
  text_title: {
    fontSize: FONT_SIZE.HEADER_TAG,
    fontWeight: '500',
  },
  text_descript: {
    fontSize: FONT_SIZE.CONTENT,
  },
  container_content: {
    flex: 1
  }
})
interface TaskTagProps {
  data: HEventMedicine | HEventVisited;
}

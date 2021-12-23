import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  COLORS,
  EventType,
  FONT_SIZE,
  HEventMedicine,
  HEventVisited,
} from '../../common';
const EventTag = ({data}: TaskTagProps) => {
  // console.log(`data-EventTag`, data);
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginBottom: 7,
        borderRadius: 10,
        // @ts-ignore
        borderColor: COLORS.EVENT_TAG[data?.type].borderColor,
        // @ts-ignore
        backgroundColor: COLORS.EVENT_TAG[data?.type].backgroundColor,
        borderWidth: 1,
        padding: 7,
      }}>
      <View style={{flex: 5}}>
        <Text
          style={{
            fontSize: FONT_SIZE.HEADER_TAG,
            fontWeight: '500',
            // @ts-ignore
            color: COLORS.EVENT_TAG[data?.type].textColor,
          }}>
          {data?.title}
        </Text>
        {data.type == EventType.MEDICINE ? (
          <Text style={{fontSize: FONT_SIZE.TINY, color: COLORS.GRAY_TEXT_2}}>
            {data?.visited?.title}
          </Text>
        ) : null}
        <Text
          style={{
            fontSize: FONT_SIZE.CONTENT,
            // @ts-ignore
            color: COLORS.EVENT_TAG[data?.type].textColor,
          }}>
          {data.type == EventType.MEDICINE ? data?.amount : data?.location}
        </Text>
        <Text
          style={{
            fontSize: FONT_SIZE.CONTENT,
            // @ts-ignore
            color: COLORS.EVENT_TAG[data?.type].textColor,
          }}>
          {data?.descript}
        </Text>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        {/* @ts-ignore */}
        <Text style={{color: COLORS.EVENT_TAG[data?.type].textColor}}>
          {data.type == EventType.MEDICINE
            ? data.time
            : data.date.toISOString().slice(11, 16)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventTag;

interface TaskTagProps {
  data: HEventMedicine | HEventVisited;
}

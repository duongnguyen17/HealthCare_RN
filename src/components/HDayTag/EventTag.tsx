import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  COLORS,
  EventType,
  FONT_SIZE,
  HEventMedicine,
  HEventVisited,
} from '../../common';
import { getHoursMinutes } from '../../utils/dateutils';
import {showLoading} from '../Loading';
const EventTag = ({data}: TaskTagProps) => {
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
        zIndex: 1,
      }}
      activeOpacity={0.6}
      onPress={() => {
       
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
        {/* {data.type == EventType.MEDICINE ? (
          <Text style={{fontSize: FONT_SIZE.TINY, color: COLORS.GRAY_TEXT_2}}>
            {data?.visited?.title}
          </Text>
        ) : null} */}
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
            : getHoursMinutes(data?.date)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventTag;

interface TaskTagProps {
  data: HEventMedicine | HEventVisited;
}

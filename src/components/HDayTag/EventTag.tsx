import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {COLORS, EventType, FONT_SIZE} from '../../common';
const EventTag = ({data}: TaskTagProps) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginBottom: 7,
      }}>
      <View style={{flex: 5}}>
        <Text style={{fontSize: FONT_SIZE.HEADER_TAG, fontWeight: '500'}}>
          {data?.title}
        </Text>
        {data.type == EventType.MEDICINE ? (
          <Text style={{fontSize: FONT_SIZE.TINY, color: COLORS.GRAY_TEXT_2}}>
            {data?.visited?.title}
          </Text>
        ) : null}
        <Text style={{fontSize: FONT_SIZE.CONTENT}}>
          {data.type == EventType.MEDICINE ? data?.amount : data?.locale}
        </Text>
        <Text style={{fontSize: FONT_SIZE.CONTENT}}>{data?.more}</Text>
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text>{data?.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventTag;
interface TaskTagProps {
  data: any;
}

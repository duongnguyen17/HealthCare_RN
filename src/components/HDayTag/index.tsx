import React, {useRef, useEffect, LegacyRef, RefObject} from 'react';
import {
  Animated,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import {COLORS, EventType, HEvent} from '../../common';
import {calDayWeek, isToday} from '../../utils/dateutils';
import EventTag from './EventTag';

const HDayTag = ({data}: HDayTagProps) => {
  // console.log(`data-HDayTag`, data);
  const container = useRef<any>(null);
  const m_isToday: boolean = isToday(data.date);
  // console.log(`m_isToday`, m_isToday);
  return (
    <View
      ref={container}
      style={styles.container}
      onLayout={(event: any) => {
        // console.log(`object`, event.nativeEvent.layout.y);
      }}>
      <View style={styles.leftSubContainer}>
        <Animated.View>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <View>
              <Text>{calDayWeek(data?.date)}</Text>
            </View>
            <View
              style={{
                borderRadius: 30,
                padding: 5,
                backgroundColor: m_isToday ? COLORS.LIGHT_BLUE : '',
              }}>
              <Text style={{color: m_isToday ? COLORS.WHITE : COLORS.BLACK}}>
                {new Date(data?.date).getDate()}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View style={styles.rigthSubContainer}>
        {m_isToday ? (
          <View
            style={{
              marginRight: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 7,
                height: 7,
                backgroundColor: COLORS.LIGHT_BLUE,
                borderRadius: 10,
              }}
            />
            <View
              style={{
                width: '100%',
                height: 1,
                backgroundColor: COLORS.LIGHT_BLUE,
              }}
            />
          </View>
        ) : null}

        {data?.event.map((value, index) => (
          <EventTag key={index} data={value} />
        ))}
      </View>
    </View>
  );
};

export default HDayTag;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  leftSubContainer: {flex: 1},
  rigthSubContainer: {flex: 8},
});
interface HDayTagProps {
  data: HEvent;
}

export interface DataTagType {
  date: Date;
  event: [];
}

import React, {useRef, useEffect, memo} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {FONT_SIZE} from '../common';
import HIcon from './HIcon';

const TriangleAnimated = memo(({state, date, onPress}: any) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (state) {
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(spinValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [state]);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={{fontSize: FONT_SIZE.CONTENT}}>{`Tháng ${
        date.getMonth() + 1
      }`}</Text>
      <Animated.View style={{marginLeft: 10, transform: [{rotate: spin}]}}>
        <HIcon font="Octicons" name={'triangle-down'} size={16} />
      </Animated.View>
    </TouchableOpacity>
  );
});

export default TriangleAnimated;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});

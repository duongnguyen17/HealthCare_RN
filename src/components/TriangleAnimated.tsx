import React, {useRef, useEffect} from 'react';
import {Animated, Easing, TouchableOpacity} from 'react-native';
import HIcon from './HIcon';

const TriangleAnimated = ({state}: any) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (state) {
      console.log('true');
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    } else {
      console.log('false');
      Animated.timing(spinValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [state]);
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],

  });
  return (
    <Animated.View style={{marginLeft: 10,transform: [{rotate: spin}]}}>
      <HIcon
        font="Octicons"
        name={'triangle-down'}
        size={16}
      />
    </Animated.View>
  );
};

export default TriangleAnimated;

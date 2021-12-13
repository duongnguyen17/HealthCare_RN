import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';

import {width} from '../../common';

const HSwipe = (props: HSwpieProps) => {
  const scrollValue = useRef(new Animated.Value(0)).current;
  const translateX = scrollValue.interpolate({
    inputRange: [0, width],
    outputRange: [0, 20],
  });
  const inputRange = [0];
  const scaleOutputRange = [1];
  props.data.forEach(
    (_, i) =>
      i != 0 && inputRange.push(...[(width * (2 * i - 1)) / 2, width * i]),
  );
  props.data.forEach((_, i) => i != 0 && scaleOutputRange.push(...[3, 1]));
  const scaleX = scrollValue.interpolate({
    inputRange,
    outputRange: scaleOutputRange,
  });
  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollValue}}}],
          {useNativeDriver: false},
        )}
        data={props.data}
        renderItem={props.renderItem}
      />
      <View style={styles.indicatorConatiner} pointerEvents="none">
        {props.data.map(index => (
          <Indicator key={index} />
        ))}
        <Animated.View
          style={[
            styles.activeIndicator,
            {
              position: 'absolute',
              transform: [{translateX}, {scaleX}],
            },
          ]}
        />
      </View>
    </View>
  );
};

function Indicator() {
  return <View style={styles.indicator} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 3,
  },
  card: {
    width: width - 10,
    height: '100%',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  indicatorConatiner: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#00000044',
    marginHorizontal: 5,
  },
  activeIndicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
});
interface HSwpieProps extends ViewProps {
  data: [DataReType];
  renderItem: (data: DataReType) => {};
}
interface DataReType {
  imageURL: String;
  url: String;
}
export default HSwipe;

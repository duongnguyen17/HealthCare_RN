import React from 'react';
import { ViewProps, View, StyleSheet } from 'react-native';
import { COLORS } from '../common';

const HairLine = (props: ViewProps) => {
  return (
    <View
      style={[
        {
          width: '100%',
          borderBottomWidth: StyleSheet.hairlineWidth,
          backgroundColor: '#e6e6e6',
          alignSelf: 'center',
          borderColor: COLORS.GRAY_TEXT_1,
        },
        props.style,
      ]}
    />
  );
};

export default HairLine;

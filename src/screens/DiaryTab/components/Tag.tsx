import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

const Tag = ({children, styles}: TagProps) => (
  <View
    style={[
      {
        borderBottomWidth: 1,
        borderColor: '#cccccc',
      },
      styles,
    ]}>
    <View style={{marginHorizontal: 10, marginVertical: 15}}>{children}</View>
  </View>
);

export default Tag;
export interface TagProps {
  children: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
}

import React from 'react';
import {
  StyleProp,
  Text, TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import { COLORS, FONT_SIZE, TYPE_SHOW } from '../../../../common';
import HIcon from '../../../../components/HIcon';

const RadioList = ({ style, data, selected, setSelected }: RadioListProps) => {
  return (
    <View style={style}>
      {data.map((value, i) => (
        <TouchableOpacity
          key={i}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
          }}
          onPress={() => {
            setSelected(value);
          }}>
          <HIcon
            font="MaterialCommunityIcons"
            name={
              selected == value
                ? 'circle-slice-8'
                : 'circle-outline'
            }
            color={selected == value ? COLORS.BLUE : COLORS.BLACK}
          />
          <Text style={{ marginLeft: 10, fontSize: FONT_SIZE.CONTENT }}>
            {value}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default RadioList;
interface RadioListProps {
  style?: StyleProp<ViewStyle>;
  data: Array<TYPE_SHOW>;
  selected: TYPE_SHOW;
  setSelected: React.Dispatch<React.SetStateAction<TYPE_SHOW>>;
}

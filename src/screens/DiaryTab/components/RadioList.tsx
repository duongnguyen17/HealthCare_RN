import React from 'react';
import {
  StyleProp,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {COLORS, DataRadioList, FONT_SIZE} from '../../../common';
import HIcon from '../../../components/HIcon';

const RadioList = ({style, data, selected, setSelected}: RadioListProps) => {
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
              selected.value == value.value
                ? 'circle-slice-8'
                : 'circle-outline'
            }
            color={selected.value == value.value ? COLORS.BLUE : '#000000'}
          />
          <Text style={{marginLeft: 10, fontSize: FONT_SIZE.CONTENT}}>
            {value.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default RadioList;
interface RadioListProps {
  style?: StyleProp<ViewStyle>;
  data: DataRadioList[];
  selected: DataRadioList;
  setSelected: React.Dispatch<React.SetStateAction<DataRadioList>>;
}

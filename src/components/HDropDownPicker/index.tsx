import React, {useState} from 'react';
import {
  FlatList,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import {COLORS} from '../../common';

const HDropDownPicker = ({
  data,
  selected,
  setSelected,
  style,
}: HDropDownPickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openClose = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        100,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.scaleXY,
      ),
    );
    setIsOpen(!isOpen);
  };
  return (
    <View
      style={[
        {
          borderRadius: 5,
          borderWidth: 1,
          borderColor: COLORS.BLUE,
          position: 'absolute',
        },
        style,
      ]}>
      <TouchableOpacity onPress={openClose}>
        <View style={{marginHorizontal: 10, marginVertical: 3}}>
          <Text>{selected?.key}</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        style={[isOpen ? {height: 50} : {height: 0}]}
        data={data.filter(element => element.value != selected.value)}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelected(item);
              openClose();
            }}>
            <View style={{marginHorizontal: 10, marginVertical: 3}}>
              <Text >{item?.key}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HDropDownPicker;

interface HDropDownPickerProps {
  data: Array<any>;
  selected: any;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
  style?: ViewProps;
}

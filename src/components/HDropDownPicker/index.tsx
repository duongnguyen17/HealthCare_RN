import React, { useState } from 'react';
import {
  FlatList,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import { COLORS } from '../../common';

const HDropDownPicker = ({
  data,
  selected,
  setSelected,
  scrollable = true,
  style,
}: HDropDownPickerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
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
      style={[{
        width: width,
        height: height,
      }, styles.container]}>
      <View
        style={[
          {
            borderWidth: 1,
            borderColor: COLORS.BLUE,
            position: 'absolute',
            right: 0,
          },
          style,
        ]}
        onLayout={({ nativeEvent }) => {
          if (!isOpen) {
            setWidth(nativeEvent.layout.width);
            setHeight(nativeEvent.layout.height);
          }
        }}>
        <TouchableOpacity onPress={openClose}>
          <View style={{ marginHorizontal: 10, marginVertical: 3 }}>
            <Text>{data.find(e => e.value == selected).key}</Text>
          </View>
        </TouchableOpacity>
        <FlatList
          style={[isOpen ? (scrollable ? { height: 50 } : null) : { height: 0 }, { zIndex: 999 }]}
          data={data.filter(element => element.value != selected)}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelected(item?.value);
                openClose();
              }}>
              <View style={{ marginHorizontal: 10, marginVertical: 3 }}>
                <Text>{item?.key}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default HDropDownPicker;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 5,
    overflow: 'hidden',

  }
})

interface HDropDownPickerProps {
  data: Array<any>;
  selected: any;
  scrollable?: boolean;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
  style?: ViewProps;
}

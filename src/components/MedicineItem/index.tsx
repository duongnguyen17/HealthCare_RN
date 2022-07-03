import React from 'react';
import { GestureResponderEvent, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONT_SIZE, Medicine } from '../../common';
import HIcon from '../HIcon';
const MedicineItem = ({ medicine, gotoMedicine }: MedicineItemProps) => {
  const gotoMedicineScreen = () => {
    gotoMedicine(medicine._id)
  }
  // console.log(`medicine-item`, medicine);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={gotoMedicineScreen}
      style={{
        marginVertical: 10,
        marginHorizontal: 3,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.EVENT_TAG.Medicine.borderColor,
      }}>
      <View
        style={{
          marginVertical: 8,
          marginHorizontal: 8,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: FONT_SIZE.CONTENT,
              fontWeight: '500',
            }}>
            {medicine?.title}
          </Text>
        </View>
        <HIcon font="MaterialIcons" name="arrow-forward-ios" size={15} />
      </View>
    </TouchableOpacity>
  );
};
export default MedicineItem;

interface MedicineItemProps {
  medicine: Medicine;
  gotoMedicine: (_id: number) => void;
}

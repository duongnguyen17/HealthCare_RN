import React, {memo, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {COLORS, STRINGS} from '../../../common';
import MedicineItem from '../../../components/MedicineItem';
import {navigateTo} from '../../../navigator/NavigationServices';
import {getListMedicines} from '../../../realm/controllers/medicine.controller';

export default memo(
  ({
    visitedId,
    medicineIds,
    addMedicine,
    updateScredules,
  }: {
    visitedId: number;
    medicineIds: Array<number>;
    addMedicine: any;
    updateScredules: any;
  }) => {
    const [medicines, setMedicines] = useState<any>([]);

    useEffect(() => {
      _getListMedicines(medicineIds);
    }, [medicineIds]);

    const _getListMedicines = async (medicineIds: Array<number>) => {
      const listMedicines = await getListMedicines(medicineIds);
      setMedicines(listMedicines);
    };

    const gotoMedicineScreen = (_id: number) => {
      navigateTo(STRINGS.ROUTE.DIARY.MEDICINE, {
        _id: _id,
      });
    };

    const gotoListMedicineScreen = () => {
      navigateTo(STRINGS.ROUTE.LIST_MEDICINE_SCREEN, {addMedicine});
    };

    return (
      <View>
        {medicines.map((value: any, index: number) => (
          <MedicineItem
            key={index}
            medicine={value}
            gotoMedicine={gotoMedicineScreen}
            visitedId={visitedId}
            updateScredules={updateScredules}
          />
        ))}
        <TouchableOpacity onPress={gotoListMedicineScreen}>
          <Text
            style={{
              paddingHorizontal: 20,
              alignSelf: 'center',
              color: COLORS.BLUE,
            }}>
            {STRINGS.VISITED_SCREEN.ADD_MEDICINE}
          </Text>
        </TouchableOpacity>
      </View>
    );
  },
);

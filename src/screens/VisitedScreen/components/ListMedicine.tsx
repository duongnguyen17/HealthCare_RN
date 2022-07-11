import React, { memo, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, STRINGS } from '../../../common';
import MedicineItem from '../../../components/MedicineItem';
import { navigateTo } from '../../../navigator/NavigationServices';
import { medicinesAction } from '../../../reduxSaga/slices/medicinesSlice';
import { RootStateType } from '../../../type/type';


export default ({ medicineIds, addMedicine }: { medicineIds: Array<number>, addMedicine: any }) => {
    const tempMedicines = useSelector((state: RootStateType) => state.medicineState.tempMedicines)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(medicinesAction.getMedicines(medicineIds))
    }, [medicineIds])

    const gotoMedicineScreen = (_id: number) => {
        navigateTo(STRINGS.ROUTE.DIARY.MEDICINE, {
            _id: _id
        });
    };


    const gotoListMedicineScreen = () => {
        navigateTo(STRINGS.ROUTE.LIST_MEDICINE_SCREEN, { addMedicine })
    }

    return (
        <View>
            {
                tempMedicines.map((value, index) => <MedicineItem key={index} medicine={value} gotoMedicine={gotoMedicineScreen} />)
            }
            <TouchableOpacity
                onPress={gotoListMedicineScreen}>
                <Text style={{ paddingHorizontal: 20, alignSelf: 'center', color: COLORS.BLUE }}>
                    {STRINGS.VISITED_SCREEN.ADD_MEDICINE}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import { COLORS, FONT_SIZE, Medicine, STRINGS } from '../../common';
import { navigateTo } from '../../navigator/NavigationServices';

const MedicineTag = ({ data, onPressItem }: MedicineTagProps) => {

    const onPress = () => {
        if (onPressItem !== undefined) onPressItem(data._id)
        else navigateTo(STRINGS.ROUTE.DIARY.MEDICINE, { _id: data._id })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            <Text style={styles.title}>{data?.title}</Text>
            <Text style={styles.note}>
                {data?.infor?.note}
            </Text>
        </TouchableOpacity>

    );
};

export default MedicineTag;
const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.LIGHT_BLUE_1,
        flex: 1,
        marginTop: 10,
        borderRadius: 6,
        padding: 10,
    },
    title: {
        fontSize: FONT_SIZE.TITLE,
        fontWeight: 'bold',
        color: COLORS.BLACK,
    },
    note: {

    }
});
interface MedicineTagProps {
    data: Medicine;
    onPressItem?: (_id: number) => void;
}

export interface DataTagType {
    date: Date;
    event: [];
}

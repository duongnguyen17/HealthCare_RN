import { Picker } from '@react-native-picker/picker';
import React, { useCallback, useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
    FlatList,
    Keyboard, ScrollView, StyleSheet, Text,
    TextInput, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    AlertType,
    COLORS,
    FONT_SIZE,
    PicNote,
    Remind,
    Schedule,
    STRINGS,
    TimeUnit
} from '../../common';
import ContainerView from '../../components/ContainerView';
import { showAlert } from '../../components/HAlert';
import HDropDownPicker from '../../components/HDropDownPicker';
import HeaderCommon from '../../components/HHeader/HHeaderCommon';
import RemindItem from '../../components/RemindItem';
import {
    goBack,
    navigateTo,
    routeParam
} from '../../navigator/NavigationServices';
import { medicinesAction } from '../../reduxSaga/slices/medicinesSlice';
import { RootStateType, ScreenProps } from '../../type/type';
import { getHoursMinutes } from '../../utils/dateutils';
import Tag from '../main/DiaryTab/components/Tag';
import TagWithIcon from '../main/DiaryTab/components/TagWithIcon';

const MedicineScreen = (props: ScreenProps) => {
    const _id = routeParam(props.route, '_id');
    const visitedId = routeParam(props.route, 'visitedId');

    const dispatch = useDispatch();
    const medicine = routeParam(props.route, 'medicine') ?? useSelector((state: RootStateType) => state.medicineState.tempMedicine)

    const [title, setTitle] = useState<string>("");
    const [infor, setInfor] = useState<PicNote>({})
    const [reminds, setReminds] = useState<Array<Remind | any>>([]);
    const [timeUnit, setTimeUnit] = useState<TimeUnit>(TimeUnit.DAY);
    const [count, setCount] = useState<string>('0');
    const [startDate, setStartDate] = useState<any>(new Date())
    const [schedules, setSchedules] = useState<Array<Schedule>>([])

    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false)

    useEffect(() => {
        if (_id != undefined) {
            dispatch(medicinesAction.getMedicine({ _id: _id }))
        }
    }, [_id])

    useEffect(() => {
        if (medicine != null && medicine != undefined) {
            setTitle(medicine?.title)
        }
    }, [medicine])

    const onSubmit = () => {
        let remindTimeArr = reminds.map(e => e.time);
        let isDuplicate = remindTimeArr.some(
            (e, i) => remindTimeArr.indexOf(e) != i,
        );
        if (isDuplicate) {
            showAlert(AlertType.WARN, STRINGS.MEDICINE_SCREEN.TIME_REMIND_DO_NOT_DUPLICATE);
        } else if (title == '' || title == undefined) {
            showAlert(AlertType.WARN, STRINGS.MEDICINE_SCREEN.THE_NAME_OF_DRUG_CANNOT_BE_LEFT_BLANK);
        } else if (!!medicine?.visitedId) {
            //nếu là update
            dispatch(
                medicinesAction.updateMedicine({
                    _id: medicine._id,
                    title,
                    during: calDuring(count, timeUnit),
                    remind: reminds,
                    start: medicine?.start,
                    visitedId: medicine?.visitedId,
                }),
            );
            goBack();
        } else {
            //nếu là tạo mới
            dispatch(medicinesAction.addMedicine({
                medicine: {
                    _id: Date.now(),
                    title,
                    infor,
                    schedules,
                }
            }))
            goBack();
        }
    };

    const calDuring = (c: string, u: TimeUnit) => {
        let unit: number = 0;
        switch (u) {
            case TimeUnit.DAY:
                unit = 1;
                break;
            case TimeUnit.WEEK:
                unit = 7;
                break;
            case TimeUnit.MONTH:
                unit = 30;
                break;
            default:
                console.log(`calDuring error - medicineScreen`);
                break;
        }
        return parseInt(c) * unit;
    };

    const addRemind = () => {
        //thêm 1 nhắc nhở trống vào cuối mảng
        setReminds([
            ...reminds,
            {
                time: getHoursMinutes(new Date()),
                descript: '',
                repeat: true,
                amount: '',
                isNew: true,
            },
        ]);
    };
    const updateRemind = (remind: Remind, index: number) => {
        reminds[index] = remind;
        // reminds[index].amount = remind.amount;
        // reminds[index].descript = remind.descript;
        // reminds[index].repeat = remind.repeat;
        // reminds[index].time = remind.time;
    };
    const deleteRemind = (index: number) => {
        let temp = [...reminds];
        temp.splice(index, 1);
        setReminds(temp);
    };

    const addNote = (text: string) => {
        setInfor({
            ...infor,
            note: text
        })
    }

    const PickDay = useCallback(() => (
        <Picker
            selectedValue={count}
            onValueChange={(itemValue, itemIndex) =>
                setCount(itemValue)
            }>
            <Picker.Item label="0" value="0" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
        </Picker>
    ), [count])

    const PickUnit = useCallback(() => (
        <Picker
            selectedValue={timeUnit}
            onValueChange={(itemValue, itemIndex) =>
                setTimeUnit(itemValue)
            }>
            <Picker.Item label="Ngày" value={TimeUnit.DAY} />
            <Picker.Item label="Tuần" value={TimeUnit.WEEK} />
            <Picker.Item label="Tháng" value={TimeUnit.MONTH} />
        </Picker>
    ), [timeUnit])

    const changeStartDate = (event: any, selectedDate: any) => {
        setStartDate(selectedDate ?? startDate)
        setDatePickerVisible(false);
    }
    const DatePicker = useCallback(() => (
        <View >
            <TouchableOpacity
                onPress={() => {
                    setDatePickerVisible(!datePickerVisible);
                }}
                style={{ flexDirection: 'row' }}>
                <Text>Ngày bắt đầu</Text>
                <Text style={{ marginLeft: 50 }}>
                    {new Date(startDate).toString().slice(0, 10)}
                </Text>

            </TouchableOpacity>

            {
                datePickerVisible && (
                    <DateTimePicker
                        //@ts-ignore
                        value={startDate}

                        display="default"
                        onChange={changeStartDate}
                    />
                )
            }
        </View>
    ), [startDate, datePickerVisible])

    const AddSchedule = useCallback(() => {
        if (_id !== undefined || (_id == undefined && visitedId == undefined)) return null
        else {
            return (
                <>
                    <TagWithIcon iconName="reminder" iconFont="MaterialCommunityIcons">

                        <Text style={{ fontSize: FONT_SIZE.HEADER_TAG }}>Nhắc nhở</Text>

                        {reminds?.map((value, index) => <RemindItem
                            key={index}
                            item={value}
                            index={index}
                            updateRemind={updateRemind}
                            deleteRemind={deleteRemind}
                            isNew={value.isNew}
                        />)}
                        <TouchableOpacity onPress={addRemind}>
                            <Text style={{ paddingHorizontal: 20, alignSelf: 'center', paddingVertical: 5, color: COLORS.BLUE }}>{STRINGS.MEDICINE_SCREEN.ADD_REMIND}</Text>
                        </TouchableOpacity>
                    </TagWithIcon>
                    <TagWithIcon iconName="calendar" iconFont="FontAwesome" iconSize={24}>
                        <DatePicker />
                    </TagWithIcon>
                    <TagWithIcon>
                        <Text style={{ fontSize: FONT_SIZE.HEADER_TAG }}>Nhắc nhở</Text>
                        <PickDay />
                        <PickUnit />
                    </TagWithIcon>
                </>
            )
        }

    }, [reminds, timeUnit, count, datePickerVisible])


    const Schedules = useCallback(() =>
        (_id !== undefined) ?
            <TagWithIcon iconName="infocirlceo" iconFont="AntDesign">
                <Text style={{ fontSize: FONT_SIZE.HEADER_TAG }}>Các lịch uống thuốc</Text>
                <TouchableOpacity
                    onPress={() => {

                    }}>
                    <View style={{ marginTop: 10 }}>

                    </View>
                </TouchableOpacity>
            </TagWithIcon> : null
        , [schedules.length])

    const Visiteds = useCallback(() => (
        (_id !== undefined) ?
            <TagWithIcon iconName="infocirlceo" iconFont="AntDesign">
                <Text style={{ fontSize: FONT_SIZE.HEADER_TAG }}>Các lần khám sử dụng</Text>
                <TouchableOpacity
                    onPress={() => {

                    }}>
                    <View style={{ marginTop: 10 }}>

                    </View>
                </TouchableOpacity>
            </TagWithIcon> : null
    ), [schedules.length])

    return (
        <ContainerView>
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                }}>
                <View style={styles.container}>
                    <HeaderCommon
                        onPressLeftIcon={() => {
                            goBack();
                        }}
                        renderTitle={() => (
                            <Text style={{ fontSize: FONT_SIZE.BIG_HEADER, color: COLORS.BLACK, fontWeight: 'bold' }}>Thuốc</Text>
                        )}
                        renderRight={() => (
                            <TouchableOpacity
                                onPress={onSubmit}
                                style={{
                                    backgroundColor: COLORS.BLUE,
                                    borderRadius: 8,
                                }}>
                                <Text
                                    style={{
                                        marginHorizontal: 10,
                                        marginVertical: 5,
                                        fontWeight: '700',
                                        fontSize: FONT_SIZE.CONTENT,
                                        color: COLORS.WHITE,
                                    }}>
                                    Lưu
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                    <ScrollView>
                        <Tag>
                            <TextInput
                                style={{ fontSize: 30 }}
                                value={title}
                                placeholder={STRINGS.MEDICINE_SCREEN.MEDICINE_NAME}
                                multiline
                                onChangeText={setTitle}
                            />
                        </Tag>
                        <TagWithIcon iconName="infocirlceo" iconFont="AntDesign">

                            <Text style={{ fontSize: FONT_SIZE.HEADER_TAG }}>Thông tin thuốc</Text>
                            <TouchableOpacity
                                onPress={() => {

                                }}>
                                <Text style={{ paddingVertical: 10, alignSelf: 'center', color: COLORS.BLUE }}>
                                    Thêm hình ảnh
                                </Text>
                            </TouchableOpacity>
                            <View style={{ borderColor: COLORS.GRAY_DECOR, borderWidth: 1, marginTop: 10 }}>
                                <TextInput multiline={true} style={{ fontSize: 14 }} placeholder={"Ghi chú"} onChangeText={addNote} />
                            </View>
                        </TagWithIcon>
                        <AddSchedule />
                        <Visiteds />
                        <Schedules />
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback >
        </ContainerView>
    );
};
export default MedicineScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textTime: {
        fontSize: FONT_SIZE.CONTENT,
        marginLeft: 6,
    },
});

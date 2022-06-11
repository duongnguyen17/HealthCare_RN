import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard, StyleSheet, Text,
  TextInput, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  AlertType,
  COLORS,
  FONT_SIZE,
  Remind,
  STRINGS,
  TimeUnit
} from '../../../../common';
import { showAlert } from '../../../../components/HAlert';
import HDropDownPicker from '../../../../components/HDropDownPicker';
import HeaderCommon from '../../../../components/HHeader/HHeaderCommon';
import RemindItem from '../../../../components/RemindItem';
import {
  goBack,
  navigateTo,
  routeParam
} from '../../../../navigator/NavigationServices';
import { medicinesAction } from '../../../../reduxSaga/slices/medicinesSlice';
import { RootStateType, ScreenProps } from '../../../../type/type';
import { getHoursMinutes } from '../../../../utils/dateutils';
import Tag from '../components/Tag';
import TagWithIcon from '../components/TagWithIcon';

const DropKey = [
  { key: STRINGS.MEDICINE_SCREEN.DAY, value: TimeUnit.DAY },
  { key: STRINGS.MEDICINE_SCREEN.WEEK, value: TimeUnit.WEEK },
  { key: STRINGS.MEDICINE_SCREEN.MONTH, value: TimeUnit.MONTH },
];

const MedicineScreen = (props: ScreenProps) => {
  const _id = routeParam(props.route, '_id');
  const dispatch = useDispatch();
  const medicine = routeParam(props.route, 'medicine') ?? useSelector((state: RootStateType) => state.medicineState.tempMedicine)

  const [title, setTitle] = useState<string>(medicine?.title);
  // const [state, setState] = useState<boolean>(true);
  const [reminds, setReminds] = useState<Array<Remind | any>>(
    medicine?.remind ?? [],
  );
  const [timeUnit, setTimeUnit] = useState<TimeUnit>(TimeUnit.DAY);
  const [count, setCount] = useState<string>(
    medicine?.during.toString() ?? '0',
  );

  useEffect(() => {
    if (_id != undefined) {
      dispatch(medicinesAction.getMedicine({ _id: _id }))
    }
  }, [])
  useEffect(() => {
    if (medicine != null && medicine != undefined) {
      setTitle(medicine?.title)
      setReminds(medicine?.remind)
      setCount(medicine?.during.toString())
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
      dispatch(medicinesAction.addTempMedicine({
        medicine: {
          _id: medicine?._id ?? Date.now(),
          title,
          during: calDuring(count, timeUnit),
          remind: reminds,
          start: null,
          visitedId: null,
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
  const renderRemindItem = ({ item, index }: { item: any, index: number }) => (
    <RemindItem
      item={item}
      index={index}
      updateRemind={updateRemind}
      deleteRemind={deleteRemind}
      isNew={item.isNew}
    />
  )
  // console.log(`reminds`, reminds);
  return (
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
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => {
                navigateTo(STRINGS.ROUTE.DIARY.VISITED, {});
              }}>
              <Text style={{ fontSize: FONT_SIZE.TITLE }}>{medicine?.title}</Text>
              <Text style={{ color: COLORS.WHITE, fontSize: FONT_SIZE.TINY }}>
                {/* {new Date(data.date).toString().slice(4, 15)} */}
              </Text>
            </TouchableOpacity>
          )}
          renderRight={() => (
            <TouchableOpacity
              onPress={onSubmit}
              style={{
                backgroundColor: COLORS.BLUE,
                borderRadius: 20,
              }}>
              <Text
                style={{
                  marginHorizontal: 10,
                  marginVertical: 5,
                  fontSize: FONT_SIZE.CONTENT,
                  color: COLORS.WHITE,
                }}>
                Lưu
              </Text>
            </TouchableOpacity>
          )}
        />
        <Tag>
          <TextInput
            style={{ fontSize: 30 }}
            value={title}
            placeholder={STRINGS.MEDICINE_SCREEN.MEDICINE_NAME}
            autoFocus
            multiline
            onChangeText={setTitle}
          />
        </Tag>
        <TagWithIcon iconName="reminder" iconFont="MaterialCommunityIcons">
          {/* <View style={{}}>
            <Text style={{fontSize: FONT_SIZE.HEADER_TAG}}>Nhắc nhở</Text>
          </View> */}
          <FlatList
            renderItem={renderRemindItem}
            keyExtractor={
              (item, index) => index.toString()
            }
            data={reminds}
          />
          <TouchableOpacity style={{ alignSelf: 'center', borderWidth: 1, borderColor: COLORS.BLUE, borderRadius: 5, alignItems: 'center', paddingVertical: 5, }} onPress={addRemind}>
            <Text style={{ paddingHorizontal: 20 }}>{STRINGS.MEDICINE_SCREEN.ADD_REMIND}</Text>
          </TouchableOpacity>
        </TagWithIcon>
        {/* </View> */}
        <TagWithIcon>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <Text style={{fontSize: FONT_SIZE.HEADER_TAG}}>Uống trong</Text> */}
            <View
              style={{
                // borderBottomWidth: 1,
                width: 80,
                alignItems: 'center',
                // marginLeft: 20,
              }}>
              <TextInput
                placeholder={STRINGS.MEDICINE_SCREEN.LAST}
                style={{ width: '100%' }}
                value={count}
                onChangeText={setCount}
                keyboardType="number-pad"
              />
            </View>

            <View style={{ marginLeft: 8 }}>
              <HDropDownPicker
                scrollable={false}
                data={DropKey}
                selected={timeUnit}
                setSelected={setTimeUnit}
              />
            </View>
          </View>
        </TagWithIcon>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default MedicineScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

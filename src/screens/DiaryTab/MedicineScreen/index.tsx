import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  AlertType,
  COLORS,
  FONT_SIZE,
  Remind,
  SCREEN,
  TimeUnit,
} from '../../../common';
import HeaderCommon from '../../../components/HHeader/HHeaderCommon';
import RemindItem from '../../../components/RemindItem';
import {ScreenProps} from '../../../type/type';
import Tag from '../components/Tag';
import HDropDownPicker from '../../../components/HDropDownPicker';
import {showAlert} from '../../../components/HAlert';
import {useDispatch} from 'react-redux';
import {medicinesAction} from '../../../reduxSaga/slices/medicinesSlice';
import moment from 'moment';

const DropKey = [
  {key: 'ngày', value: TimeUnit.DAY},
  {key: 'tuần', value: TimeUnit.WEEK},
  {key: 'tháng', value: TimeUnit.MONTH},
];

const MedicineScreen = (props: ScreenProps) => {
  const now = new Date();
  const data = props.route?.params?.data;
  const dispatch = useDispatch();
  const medicine = props.route?.params?.medicine;

  const [title, setTitle] = useState<string>(medicine?.title);
  // const [state, setState] = useState<boolean>(true);
  const [reminds, setReminds] = useState<Array<Remind | any>>(
    medicine?.remind ?? [],
  );
  const [timeUnit, setTimeUnit] = useState<TimeUnit>(TimeUnit.DAY);
  const [count, setCount] = useState<string>(
    medicine?.during.toString() ?? '0',
  );
  const onSubmit = () => {
    let remindTimeArr = reminds.map(e => e.time);
    let isDuplicate = remindTimeArr.some(
      (e, i) => remindTimeArr.indexOf(e) != i,
    );
    if (isDuplicate) {
      showAlert(AlertType.WARN, 'Thời gian nhắc nhở không được trùng nhau');
    } else if (title == '' || title == undefined) {
      showAlert(AlertType.WARN, 'Không được để trống tên thuốc');
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
      props.navigation?.goBack();
    } else {
      //nếu là tạo mới
      props.navigation?.goBack();
      props.route?.params?.updateMedicine({
        _id: medicine?._id ?? Date.now(),
        title,
        during: calDuring(count, timeUnit),
        remind: reminds,
        start: null,
        visitedId: null,
      });
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
    setReminds([
      ...reminds,
      {
        time: '' + now.getHours() + ':' + now.getMinutes(),
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
  // console.log(`reminds`, reminds);
  return (
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
      <View style={styles.container}>
        <HeaderCommon
          onPressLeftIcon={() => {
            props.navigation?.goBack();
          }}
          renderTitle={() => (
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={() => {
                props.navigation?.navigate(SCREEN.DIARY.VISITED, {});
              }}>
              <Text style={{fontSize: FONT_SIZE.TITLE}}>{data.title}</Text>
              <Text style={{color: '#cccccc', fontSize: FONT_SIZE.TINY}}>
                {new Date(data.date).toString().slice(4, 15)}
              </Text>
            </TouchableOpacity>
          )}
          renderRight={() => (
            <TouchableOpacity
              onPress={onSubmit}
              style={{
                backgroundColor: '#00aaff',
                borderRadius: 20,
              }}>
              <Text
                style={{
                  marginHorizontal: 10,
                  marginVertical: 5,
                  fontSize: FONT_SIZE.CONTENT,
                  color: '#fff',
                }}>
                Lưu
              </Text>
            </TouchableOpacity>
          )}
        />
        <Tag>
          <TextInput
            value={title}
            placeholder="Thêm tên thuốc"
            autoFocus={true}
            onChangeText={setTitle}
          />
        </Tag>
        <Tag>
          <View style={{}}>
            <Text style={{fontSize: FONT_SIZE.HEADER_TAG}}>Nhắc nhở</Text>
          </View>
          <FlatList
            renderItem={({item, index}) => (
              <RemindItem
                item={item}
                index={index}
                updateRemind={updateRemind}
                deleteRemind={deleteRemind}
                isNew={item.isNew}
              />
            )}
            data={reminds}
          />
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: COLORS.BLUE,
              borderRadius: 5,
              alignItems: 'center',
              paddingVertical: 5,
            }}
            onPress={addRemind}>
            <Text style={{paddingHorizontal: 20}}>Thêm nhắc nhở</Text>
          </TouchableOpacity>
        </Tag>
        {/* </View> */}
        <Tag>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: FONT_SIZE.HEADER_TAG}}>Uống trong</Text>
            <View
              style={{
                borderBottomWidth: 1,
                width: 60,
                alignItems: 'center',
                marginLeft: 20,
              }}>
              <TextInput
                style={{width: '100%'}}
                value={count}
                onChangeText={setCount}
                keyboardType="number-pad"
              />
            </View>

            <View style={{marginLeft: 8}}>
              <HDropDownPicker
                scrollable={false}
                data={DropKey}
                selected={timeUnit}
                setSelected={setTimeUnit}
              />
            </View>
          </View>
        </Tag>
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

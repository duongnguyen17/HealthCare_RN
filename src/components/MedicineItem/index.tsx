import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  COLORS,
  FONT_SIZE,
  Medicine,
  Remind,
  Schedule,
  STRINGS,
  TimeUnit,
} from '../../common';
import Tag from '../../screens/main/DiaryTab/components/Tag';
import TagWithIcon from '../../screens/main/DiaryTab/components/TagWithIcon';
import {getHoursMinutes} from '../../utils/dateutils';
import HairLine from '../HairLine';
import HIcon from '../HIcon';
import RemindItem from '../RemindItem';
const MedicineItem = ({
  medicine,
  gotoMedicine,
  visitedId,
  updateScredules,
}: MedicineItemProps) => {
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
  const [timeUnit, setTimeUnit] = useState<TimeUnit>(TimeUnit.DAY);
  const [count, setCount] = useState<string>('0');
  const [startDate, setStartDate] = useState<any>(new Date());
  const [reminds, setReminds] = useState<Array<Remind>>([]);

  useEffect(() => {}, []);

  const addRemind = () => {
    //thêm 1 nhắc nhở trống vào cuối mảng
    setReminds([
      ...reminds,
      {
        time: getHoursMinutes(new Date()),
        descript: '',
        repeat: true,
        amount: '',
        //@ts-ignore
        isNew: true,
      },
    ]);
  };

  const updateRemind = (remind: Remind, index: number) => {
    reminds[index] = remind;
    updateScredules(medicine._id, {
      visitedId,
      during: parseInt(count),
      start: startDate.getTime(),
      reminds: reminds,
    } as Schedule);
  };

  const deleteRemind = (index: number) => {
    let temp = [...reminds];
    temp.splice(index, 1);
    setReminds(temp);
    updateScredules(medicine._id, {
      visitedId,
      during: parseInt(count),
      start: startDate.getTime(),
      reminds: temp,
    } as Schedule);
  };

  const gotoMedicineScreen = () => {
    gotoMedicine(medicine._id);
  };

  const PickDay = useCallback(
    () => (
      <Picker
        selectedValue={count}
        onValueChange={(itemValue, itemIndex) => setCount(itemValue)}>
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
    ),
    [count],
  );

  const changeStartDate = (event: any, selectedDate: any) => {
    setStartDate(selectedDate ?? startDate);
    setDatePickerVisible(false);
  };

  const DatePicker = useCallback(
    () => (
      <View>
        <TouchableOpacity
          onPress={() => {
            setDatePickerVisible(!datePickerVisible);
          }}
          style={{flexDirection: 'row'}}>
          <Text>Ngày bắt đầu</Text>
          <Text style={{marginLeft: 50}}>
            {new Date(startDate).toString().slice(0, 10)}
          </Text>
        </TouchableOpacity>

        {datePickerVisible && (
          <DateTimePicker
            //@ts-ignore
            value={startDate}
            display="default"
            onChange={changeStartDate}
          />
        )}
      </View>
    ),
    [startDate, datePickerVisible],
  );

  const PickUnit = useCallback(
    () => (
      <Picker
        selectedValue={timeUnit}
        onValueChange={(itemValue, itemIndex) => setTimeUnit(itemValue)}>
        <Picker.Item label="Ngày" value={TimeUnit.DAY} />
        <Picker.Item label="Tuần" value={TimeUnit.WEEK} />
        <Picker.Item label="Tháng" value={TimeUnit.MONTH} />
      </Picker>
    ),
    [timeUnit],
  );

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{flex: 1, padding: 12}}
          onPress={gotoMedicineScreen}
          activeOpacity={0.7}>
          <Text style={styles.title}>{medicine?.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={addRemind}
          activeOpacity={0.7}
          style={{padding: 12, justifyContent: 'center'}}>
          <HIcon font="MaterialCommunityIcons" name="table-clock" size={15} />
        </TouchableOpacity>
      </View>
      <View>
        <Tag>
          {reminds?.map((value: any, index: number) => (
            <RemindItem
              key={index}
              item={value}
              index={index}
              updateRemind={updateRemind}
              deleteRemind={deleteRemind}
              isNew={value.isNew}
            />
          ))}
        </Tag>
        <Tag>
          <DatePicker />
        </Tag>
        <TagWithIcon>
          <Text style={{fontSize: FONT_SIZE.HEADER_TAG}}>Nhắc nhở</Text>
          <PickDay />
          <PickUnit />
        </TagWithIcon>
      </View>
    </View>
  );
};
export default MedicineItem;

interface MedicineItemProps {
  medicine: Medicine;
  gotoMedicine: (_id: number) => void;
  visitedId: number;
  updateScredules: (medicine: number, schedule: Schedule) => void;
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.EVENT_TAG.Medicine.borderColor,
  },
  title: {
    fontSize: FONT_SIZE.CONTENT,
    fontWeight: '700',
    color: COLORS.BLACK,
  },
});

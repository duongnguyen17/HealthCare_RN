import React, {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {COLORS, Remind} from '../../common';
import HIcon from '../HIcon';
const RemindItem = ({
  item,
  index,
  updateRemind,
  deleteRemind,
  isNew,
}: RemindItemProps) => {
  const now = new Date().toISOString();
  const [amount, setAmount] = useState(item.amount ?? '');
  const [descript, setDescript] = useState(item.descript ?? '');
  const [isEdit, setIsEdit] = useState(isNew ?? false);
  const [time, setTime] = useState<Date>(
    item?.time
      ? new Date(now.slice(0, 11) + item.time + now.slice(16, 24))
      : new Date(),
  );
  const [repeat, setRepeat] = useState<boolean>(item?.repeat ?? true);
  const [isShowTimePicker, setIsShowTimePicker] = useState<boolean>(true);
  const onSubmit = () => {
    updateRemind(
      {
        amount,
        descript,
        time: time.toISOString().slice(11, 16),
        repeat,
      },
      index,
    );
  };
  const onChange = (event: any, selectedDate: any) => {
    const currTime = selectedDate;
    setTime(currTime);
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onLongPress={() => {
        setIsEdit(true);
      }}
      style={{
        marginVertical: 15,
        marginHorizontal: 3,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.EVENT_TAG.Medicine.borderColor,
      }}>
      <View
        style={{
          marginVertical: 8,
          marginHorizontal: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // justifyContent: 'space-around',
          }}>
          <View style={{width: 100}}>
            <DateTimePicker
              testID="dateTimePicker"
              value={time}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          </View>
          <TouchableOpacity
            style={{marginLeft: 20}}
            onPress={() => {
              setRepeat(!repeat);
            }}>
            <HIcon
              font="MaterialCommunityIcons"
              name={repeat ? 'repeat' : 'repeat-off'}
              color={repeat ? COLORS.BLUE : 'black'}
            />
          </TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              right: 0,
              height: '100%',
            }}>
            <View
              style={isEdit ? {flexDirection: 'row'} : {width: 0, height: 0}}>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  if (isEdit) {
                    setIsEdit(false);
                    deleteRemind(index);
                  }
                }}>
                <HIcon
                  font="MaterialCommunityIcons"
                  name={'trash-can-outline'}
                  color={'red'}
                  // size={18}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginLeft: 20}}
                onPress={() => {
                  if (isEdit) {
                    setIsEdit(false);
                    onSubmit();
                  }
                }}>
                <HIcon font="MaterialIcons" name="done" color={COLORS.BLUE} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text>Liều lượng</Text>
          <TextInput
            editable={isEdit}
            autoFocus
            style={{
              borderBottomWidth: 1,
              width: '75%',
              borderBottomColor: '#cccccc',
            }}
            value={amount}
            onChangeText={setAmount}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            justifyContent: 'space-between',
          }}>
          <Text>Ghi chú</Text>
          <TextInput
            editable={isEdit}
            multiline
            style={{
              borderBottomWidth: 1,
              width: '75%',
              borderBottomColor: '#cccccc',
            }}
            value={descript}
            onChangeText={setDescript}
          />
        </View>
        <View></View>
      </View>
    </TouchableOpacity>
  );
};

export default RemindItem;
interface RemindItemProps {
  item: Remind;
  index: number;
  updateRemind: Function;
  deleteRemind: Function;
  isNew?: boolean;
}

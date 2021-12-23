import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {AlertType, COLORS, FONT_SIZE, Remind, SCREEN} from '../../../common';
import HeaderCommon from '../../../components/HHeader/HHeaderCommon';
import RemindItem from '../../../components/RemindItem';
import {ScreenProps} from '../../../type/type';
import Tag from '../components/Tag';
import HDropDownPicker from '../../../components/HDropDownPicker';
import {showAlert} from '../../../components/HAlert';

const TimeUnit = [
  {key: 'ngày', value: 1},
  {key: 'tuần', value: 2},
  {key: 'tháng', value: 3},
];

const MedicineScreen = (props: ScreenProps) => {
  const now = new Date();
  const [title, setTitle] = useState<string>('');
  // const [state, setState] = useState<boolean>(true);
  const [reminds, setReminds] = useState<Array<Remind | any>>([]);
  const [timeUnit, setTimeUnit] = useState<any>({key: 'ngày', value: 1});
  const [day, setDay] = useState<string>('0');
  const onSubmit = () => {
    if (title == '' || title == undefined) {
      showAlert(AlertType.WARN, 'Không được để trống tên thuốc');
    }
  };

  const addRemind = () => {
    setReminds([
      ...reminds,
      {
        time: now.toISOString().slice(11, 16),
        descript: '',
        repeat: true,
        amount: '',
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <HeaderCommon
        onPressLeftIcon={() => {
          props.navigation?.goBack();
        }}
        renderTitle={() => (
          <TouchableOpacity
            onPress={() => {
              props.navigation?.navigate(SCREEN.DIARY.VISITED, {});
            }}>
            <Text style={{fontSize: FONT_SIZE.TITLE}}>
              {props.route?.params?.data.title}
            </Text>
            <Text style={{color: '#cccccc', fontSize: FONT_SIZE.TINY}}>
              {props.route?.params?.data.date}
            </Text>
          </TouchableOpacity>
        )}
        renderRight={() => (
          <TouchableOpacity
            onPress={onSubmit}
            style={{
              backgroundColor: '#00aaff',
              height: '100%',
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
          renderItem={({item}) => <RemindItem item={item} />}
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
              value={day}
              onChangeText={setDay}
              keyboardType="number-pad"
            />
          </View>

          <View style={{marginLeft: 8}}>
            <HDropDownPicker
              data={TimeUnit}
              selected={timeUnit}
              setSelected={setTimeUnit}
            />
          </View>
        </View>
      </Tag>
    </View>
  );
};
export default MedicineScreen;
interface MedicineScreenProps {}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

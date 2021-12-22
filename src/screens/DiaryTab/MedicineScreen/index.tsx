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
import {FONT_SIZE, SCREEN} from '../../../common';
import HeaderCommon from '../../../components/HHeader/HHeaderCommon';
import RemindItem from '../../../components/RemindItem';
import {ScreenProps} from '../../../type/type';
import Tag from '../components/Tag';
const MedicineScreen = (props: ScreenProps) => {
  const [name, setName] = useState<string>('');
  // const [state, setState] = useState<boolean>(true);
  const [reminds, setReminds] = useState([]);

  const [day, setDay] = useState<string>('0');
  const onSubmit = () => {};
  return (
    <View style={styles.container}>
      <HeaderCommon
        onPressLeftIcon={() => {
          props.navigation?.goBack();
        }}
        renderTitle={() => (
          <View>
            <Text style={{fontSize:FONT_SIZE.TITLE}}>{props.route?.params?.data.title}</Text>
            <Text style={{color:'#cccccc', fontSize:FONT_SIZE.TINY}}>
              {props.route?.params?.data.date}
            </Text>
          </View>
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
          value={name}
          placeholder="Thêm tên thuốc"
          autoFocus={true}
          onChangeText={setName}
        />
      </Tag>
      {/* <View style={{flexDirection: 'row'}}>
          <Text>Trạng thái</Text>
          <View
            style={{
              flexDirection: 'row',
              borderRadius: 10,
              borderWidth: 1,
            }}>
            <TouchableOpacity
              onPress={() => {
                setState(true);
              }}
              style={{
                backgroundColor: state ? '#00aaff' : '#fff',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}>
              <Text>Xong</Text>
            </TouchableOpacity>
            <View style={{width: 1, backgroundColor: 'black'}} />
            <TouchableOpacity
              onPress={() => {
                setState(false);
              }}
              style={{
                backgroundColor: state ? '#fff' : '#00aaff',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}>
              <Text>Chưa xong</Text>
            </TouchableOpacity>
          </View>
        </View> */}
      {/* <View style={{borderWidth: 1, borderColor: 'black'}}> */}
      <Tag>
        <View style={{borderBottomWidth: 1, borderColor: '#cccccc'}}>
          <Text>Nhắc nhở</Text>
        </View>
        <FlatList
          renderItem={({item}) => <RemindItem item={item} />}
          data={reminds}
        />
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            borderTopWidth: 1,
            borderColor: '#cccccc',
            alignItems: 'center',
            paddingVertical: 5,
          }}
          onPress={() => {}}>
          <Text style={{paddingHorizontal: 20}}>Thêm nhắc nhở</Text>
        </TouchableOpacity>
      </Tag>
      {/* </View> */}
      <Tag>
        <View style={{flexDirection: 'row'}}>
          <Text>Uống trong</Text>
          <TextInput
            value={day}
            onChangeText={setDay}
            keyboardType="number-pad"
          />
          <View>
            <Text>Ngày</Text>
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

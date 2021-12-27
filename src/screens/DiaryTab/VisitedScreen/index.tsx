import React, {useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  AlertType,
  COLORS,
  FONT_SIZE,
  Medicine,
  SCREEN,
  SearchType,
  Visited,
  width,
} from '../../../common';
import HHeaderCommon from '../../../components/HHeader/HHeaderCommon';
import HIcon from '../../../components/HIcon';
import MedicineItem from '../../../components/MedicineItem';
import {ScreenProps} from '../../../type/type';
import Tag from '../components/Tag';
import {showAlert} from '../../../components/HAlert';
import {useDispatch} from 'react-redux';
import {visitedAction} from '../../../reduxSaga/slices/visitedSlice';
import {medicineAction} from '../../../reduxSaga/slices/medicineSlice';
const VisitedScreen = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const visited: Visited = props.route?.params?.visited;
  const [title, setTitle] = useState<string>(visited?.title ?? '');
  // const [state, setState] = useState<boolean>(true);
  const [pre, setPre] = useState<number | null>(visited?.pre);
  const [location, setLocation] = useState(visited?.location ?? '');
  const [date, setDate] = useState(visited?.date ?? new Date());
  const [medicines, setMedicines] = useState<Array<Medicine>>(
    visited?.medicines ?? [],
  );
  const [descript, setDescript] = useState<string>(visited?.descript ?? '');
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const onSubmit = () => {
    if (title == '' || title == undefined) {
      showAlert(AlertType.WARN, 'Không được để trống tên lần khám');
    } else {
      let visitedId = visited?._id ?? Date.now();
      let tempVisited = {
        _id: visitedId,
        title,
        pre,
        location,
        descript,
        date,
      };
      if (!visited) {
        dispatch(visitedAction.addVisited(tempVisited));
      } else {
        dispatch(visitedAction.updateVisited(tempVisited));
      }
      let medicinesTemp = [...medicines];
      medicinesTemp.forEach(e => {
        if (e.visitedId != visitedId) {
          e.visitedId = visitedId;
          e.start = date;
        }
      });
      dispatch(medicineAction.updateAllMedicineOfVisited(medicinesTemp));
      props.navigation?.goBack();
    }
  };
  const updateMedicine = (medicine: Medicine) => {
    console.log(`medicine-visited`, medicine);
    let have = false;
    medicines.forEach((element: Medicine) => {
      if (element._id == medicine._id) {
        element.during = medicine.during;
        element.remind = medicine.remind;
        element.start = medicine.start;
        element.title = medicine.title;
        element.visitedId = medicine.visitedId;
        have = true;
      }
    });
    if (have) {
      setMedicines([...medicines]);
    } else {
      setMedicines([...medicines, medicine]);
    }
  };
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };
  const gotoSearchScreen = (type: SearchType) => {
    props?.navigation?.navigate(SCREEN.SEARCH, {type: type});
  };
  const gotoMedicineScreen = (medicine: Medicine | null = null) => {
    if (title == '' || title == undefined) {
      // hiện cảnh báo: không được để trống title
      showAlert(AlertType.WARN, 'Phải đặt tên lần khám');
    } else
      props.navigation?.navigate(SCREEN.DIARY.MEDICINE, {
        data: {title: title, date: date.toISOString().slice(0, 10)},
        medicine,
        updateMedicine,
      });
  };
  // console.log(`medicines-visitedScreen`, medicines);
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <HHeaderCommon
            navigation={props.navigation}
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
              placeholder="Thêm tiêu đề"
              autoFocus
              multiline
              onChangeText={setTitle}
            />
          </Tag>
          {/* <Tag>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>Trạng thái</Text>
              <View
                style={{
                  flexDirection: 'row',
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#cccccc',
                  marginLeft: width / 5,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setState(true);
                  }}
                  style={{
                    backgroundColor: state ? '#00aaff' : '#fff',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    paddingVertical: 3,
                    paddingHorizontal: 5,
                  }}>
                  <Text style={{color: state ? '#fff' : '#000000'}}>Xong</Text>
                </TouchableOpacity>
                <View style={{width: 1, backgroundColor: '#cccccc'}} />
                <TouchableOpacity
                  onPress={() => {
                    setState(false);
                  }}
                  style={{
                    backgroundColor: state ? '#fff' : '#ff8566',
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    paddingVertical: 3,
                    paddingHorizontal: 5,
                  }}>
                  <Text style={{color: state ? '#000000' : '#fff'}}>
                    Chưa xong
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Tag> */}
          <Tag>
            <TouchableOpacity
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
              onPress={() => {
                gotoSearchScreen(SearchType.VISITED);
              }}>
              <Text>Lần Khám trước</Text>
              <View
                style={{
                  flex: 1,
                  marginHorizontal: 5,
                  alignItems: 'center',
                }}>
                <Text>
                  {pre ?? <Text style={{color: '#cccccc'}}>Không có</Text>}
                </Text>
              </View>

              <HIcon font="MaterialIcons" name="arrow-forward-ios" size={18} />
            </TouchableOpacity>
          </Tag>
          <Tag>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextInput
                value={location}
                multiline
                onChangeText={setLocation}
                placeholder="Địa điểm"
                style={{flex: 1}}
              />
              {/* <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => {
                  gotoSearchScreen(SearchType.LOCALE);
                }}>
                <HIcon
                  font="MaterialIcons"
                  name="arrow-forward-ios"
                  size={18}
                />
              </TouchableOpacity> */}
            </View>
          </Tag>
          <Tag>
            <TouchableOpacity
              onPress={() => {
                setDatePickerVisible(!datePickerVisible);
              }}
              style={{flexDirection: 'row'}}>
              <Text>Ngày khám</Text>
              <Text style={{marginLeft: 50}}>
                {date.toISOString().slice(0, 10)}
              </Text>
            </TouchableOpacity>
          </Tag>
          {datePickerVisible && (
            <DateTimePicker
              // style={{backgroundColor: '#fff'}}
              value={date}
              mode={'date'}
              display="spinner"
              onChange={onChange}
            />
          )}
          <Tag>
            {/* <View style={{borderWidth: 1, borderColor: 'black'}}> */}
            <View style={{borderBottomWidth: 1, borderColor: '#cccccc'}}>
              <Text style={{marginBottom: 5}}>Thuốc</Text>
            </View>
            <FlatList
              renderItem={({item}) => (
                <MedicineItem
                  medicine={item}
                  gotoMedicine={() => {
                    gotoMedicineScreen(item);
                  }}
                />
              )}
              data={medicines}
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
              onPress={() => {
                gotoMedicineScreen();
              }}>
              <Text style={{paddingHorizontal: 20}}>Thêm thuốc</Text>
            </TouchableOpacity>
            {/* </View> */}
          </Tag>
          <Tag>
            <TextInput
              value={descript}
              multiline
              onChangeText={setDescript}
              placeholder="Ghi chú"
            />
          </Tag>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default VisitedScreen;
const styles = StyleSheet.create({});

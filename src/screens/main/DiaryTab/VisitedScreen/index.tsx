import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import {
  Keyboard, ScrollView, StyleSheet, Text,
  TextInput, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  AlertType,
  COLORS,
  FONT_SIZE,
  Medicine, SearchType,
  STRINGS, Visited
} from '../../../../common';
import ContainerView from '../../../../components/ContainerView';
import HairLine from '../../../../components/HairLine';
import { showAlert } from '../../../../components/HAlert';
import HHeaderCommon from '../../../../components/HHeader/HHeaderCommon';
import HIcon from '../../../../components/HIcon';
import MedicineItem from '../../../../components/MedicineItem';
import {
  goBack,
  navigateTo,
  routeParam
} from '../../../../navigator/NavigationServices';
import { medicinesAction } from '../../../../reduxSaga/slices/medicinesSlice';
import { visitedsAction } from '../../../../reduxSaga/slices/visitedsSlice';
import { RootStateType, ScreenProps } from '../../../../type/type';
import Tag from '../components/Tag';
import TagWithIcon from '../components/TagWithIcon';
const VisitedScreen = (props: ScreenProps) => {
  const _id = routeParam(props.route, '_id');

  const dispatch = useDispatch();
  const tempMedicine = useSelector((state: RootStateType) => state.medicineState.tempMedicine)
  const visited: Visited | null | undefined = useSelector((state: RootStateType) => state.visitedState.tempVisited)

  const [title, setTitle] = useState<string>('');
  const [pre, setPre] = useState<number | null>();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(Date.now());
  const [medicines, setMedicines] = useState<Array<Medicine>>([]);
  const [descript, setDescript] = useState<string>('');
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [modeCalendar, setModeCalendar] = useState('date')
  const [xRayImages, setXRayImage] = useState([])
  useEffect(() => {
    if (_id != undefined) {
      dispatch(visitedsAction.getVisted({ _id: _id }))
    }
  }, [])

  useEffect(() => {
    if ((_id != null || _id != undefined) && visited != null && visited != undefined) {
      setTitle(visited?.title)
      setPre(visited?.pre)
      setLocation(visited?.location)
      setDate(visited?.date)
      setDescript(visited?.descript)
      setMedicines(visited?.medicines ?? [])
    }
  }, [visited])

  useEffect(() => {
    if (tempMedicine != null && tempMedicine != undefined)
      updateMedicine({ ...tempMedicine })
  }, [tempMedicine])

  const onSubmit = () => {
    if (title == '' || title == undefined) {
      showAlert(AlertType.WARN, STRINGS.VISITED_SCREEN.THE_NAME_OF_EXAMINATION_CANNOT_BE_LEFT_BLANK);
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
        dispatch(visitedsAction.addVisited(tempVisited));
      } else {
        dispatch(visitedsAction.updateVisited(tempVisited));
      }
      if (medicines.length != 0) {
        let medicinesTemp = [...medicines];
        medicinesTemp.forEach(e => {
          if (e.visitedId !== visitedId) {
            e.visitedId = visitedId;
            e.start = date;
          }
        });
        dispatch(medicinesAction.updateAllMedicineOfVisited(medicinesTemp));
      }
      goBack();
    }
  };

  const updateMedicine = (medicine: Medicine) => {
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
    dispatch(medicinesAction.addTempMedicine({ medicine: null }))
  };

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setModeCalendar("time")
  };
  const onChangeTime = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || date;
    setDate(new Date(date).setTime(new Date(currentTime).getTime()));
    setDatePickerVisible(false);
    setModeCalendar("date")
  };

  const gotoSearchScreen = () => {
    navigateTo(STRINGS.ROUTE.SEARCH, { type: SearchType.VISITED });
  };

  const gotoMedicineScreen = (medicine: Medicine | null = null) => {
    if (title == '' || title == undefined) {
      showAlert(AlertType.WARN, STRINGS.VISITED_SCREEN.THE_NAME_OF_EXAMINATION_CANNOT_BE_LEFT_BLANK);
    } else
      navigateTo(STRINGS.ROUTE.DIARY.MEDICINE, {
        data: { title: title, date: date },
        medicine,
      });
  };

  return (
    <ContainerView>
      < TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View style={{ flex: 1 }}>
          <HHeaderCommon
            renderRight={() => (
              <TouchableOpacity
                onPress={onSubmit}
                style={styles.btnSave}>
                <Text
                  style={styles.textSave}>
                  Lưu
                </Text>
              </TouchableOpacity>
            )}
            renderTitle={(() => <Text style={styles.textTitle}>Lần Khám</Text>)}
          />
          <ScrollView>
            <Tag>
              <TextInput
                style={{ fontSize: 30 }}
                value={title}
                placeholder={STRINGS.VISITED_SCREEN.VISITED_NAME}
                multiline
                numberOfLines={2}
                onChangeText={setTitle}
              />
            </Tag>
            <TagWithIcon iconName="event-note" iconFont="MaterialIcons">
              <TouchableOpacity
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                onPress={gotoSearchScreen}>
                <Text>{STRINGS.VISITED_SCREEN.LAST_VISITED}</Text>
                <View
                  style={{
                    flex: 1,
                    marginHorizontal: 5,
                    alignItems: 'center',
                  }}>
                  <Text>
                    {pre ?? (
                      <Text style={{ color: COLORS.GRAY_DECOR }}>
                        {STRINGS.VISITED_SCREEN.DO_NOT_HAVE}
                      </Text>
                    )}
                  </Text>
                </View>
                <HIcon font="MaterialIcons" name="arrow-forward-ios" size={18} />
              </TouchableOpacity>
            </TagWithIcon>
            <TagWithIcon iconName="map-marker" iconFont="FontAwesome">
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
                  placeholder={STRINGS.VISITED_SCREEN.LOCATION}
                  style={{ flex: 1 }}
                />
              </View>
            </TagWithIcon>
            <TagWithIcon iconName="calendar" iconFont="FontAwesome" iconSize={24}>
              <TouchableOpacity
                onPress={() => {
                  setDatePickerVisible(!datePickerVisible);
                }}
                style={{ flexDirection: 'row' }}>
                <Text>{STRINGS.VISITED_SCREEN.EX_DAY}</Text>
                <Text style={{ marginLeft: 50 }}>
                  {new Date(date).toString().slice(0, 10)}
                </Text>
                <Text style={styles.textTime}>{new Date(date).toString().slice(16, 21)}</Text>
              </TouchableOpacity>
            </TagWithIcon>
            {datePickerVisible && (
              <DateTimePicker
                //@ts-ignore
                value={new Date(date)}
                //@ts-ignore
                mode={modeCalendar}
                display="default"
                onChange={modeCalendar == "date" ? onChangeDate : onChangeTime}
              />
            )}
            <TagWithIcon iconName="medicinebox" iconFont="AntDesign">
              {medicines.map((value, index) => <MedicineItem
                key={index}
                medicine={value}
                gotoMedicine={() => {
                  gotoMedicineScreen(value);
                }}
              />)}
              <TouchableOpacity
                onPress={() => {
                  gotoMedicineScreen();
                }}>
                <Text style={{ paddingHorizontal: 20, alignSelf: 'center', color: COLORS.BLUE }}>
                  {STRINGS.VISITED_SCREEN.ADD_MEDICINE}
                </Text>
              </TouchableOpacity>
              <HairLine style={{ width: '60%', marginVertical: 10 }} />
              <TouchableOpacity
                onPress={() => {
                  gotoMedicineScreen();
                }}>
                <Text style={{ paddingHorizontal: 20, alignSelf: 'center', color: COLORS.BLUE }}>
                  Thêm hình ảnh đơn thuốc
                </Text>
              </TouchableOpacity>
              <View style={{ borderColor: COLORS.GRAY_DECOR, borderWidth: 1, marginTop: 10 }}>
                <TextInput multiline={true} style={{ fontSize: 14 }} placeholder={"Ghi chú"} />
              </View>
            </TagWithIcon>
            <TagWithIcon iconName="x-ray" iconFont="FontAwesome5">
              <Text>Chuẩn đoán hình ảnh</Text>
              <TouchableOpacity
                onPress={() => {
                  gotoMedicineScreen();
                }}>
                <Text style={{ paddingVertical: 10, alignSelf: 'center', color: COLORS.BLUE }}>
                  Thêm hình ảnh
                </Text>
              </TouchableOpacity>
              <View style={{ borderColor: COLORS.GRAY_DECOR, borderWidth: 1, marginTop: 10 }}>
                <TextInput multiline={true} style={{ fontSize: 14 }} placeholder={"Ghi chú"} />
              </View>
            </TagWithIcon>
            <TagWithIcon iconName="test-tube" iconFont="Fontisto">
              <Text>Kết quả xét nghiệm</Text>
              <TouchableOpacity
                onPress={() => {
                  gotoMedicineScreen();
                }}>
                <Text style={{ paddingVertical: 10, alignSelf: 'center', color: COLORS.BLUE }}>
                  Thêm hình ảnh
                </Text>
              </TouchableOpacity>
              <View style={{ borderColor: COLORS.GRAY_DECOR, borderWidth: 1, marginTop: 10 }}>
                <TextInput multiline={true} style={{ fontSize: 14 }} placeholder={"Ghi chú"} />
              </View>
            </TagWithIcon>
            <TagWithIcon iconName="notes" iconFont="MaterialIcons">
              <TextInput
                value={descript}
                multiline
                onChangeText={setDescript}
                placeholder={STRINGS.VISITED_SCREEN.NOTE}
              />
            </TagWithIcon>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback >
    </ContainerView >
  );
};
export default VisitedScreen;


const styles = StyleSheet.create({
  textTime: {
    fontSize: FONT_SIZE.CONTENT,
    marginLeft: 6,
  },
  textSave: {
    marginHorizontal: 10,
    marginVertical: 5,
    fontWeight: '700',
    fontSize: FONT_SIZE.CONTENT,
    color: COLORS.WHITE,
  },
  btnSave: {
    backgroundColor: COLORS.BLUE,
    borderRadius: 8,
  },
  textTitle: {
    fontSize: FONT_SIZE.BIG_HEADER,
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
})
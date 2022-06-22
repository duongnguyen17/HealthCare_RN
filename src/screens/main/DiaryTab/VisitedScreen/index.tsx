import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import {
  FlatList, Keyboard, KeyboardAvoidingView,
  Platform, StyleSheet, Text,
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

  const gotoSearchScreen = (type: SearchType) => {
    navigateTo(STRINGS.ROUTE.SEARCH, { type: type });
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <HHeaderCommon
            // renderTitle={() => (
            //   <Text style={{fontSize: FONT_SIZE.BIG_HEADER}}>
            //     {STRINGS.VISITED_SCREEN.TITLE}
            //   </Text>
            // )}
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
              placeholder={STRINGS.VISITED_SCREEN.VISITED_NAME}
              autoFocus
              multiline
              numberOfLines={2}
              onChangeText={setTitle}
            />
          </Tag>
          <TagWithIcon iconName="event-note" iconFont="MaterialIcons">
            <TouchableOpacity
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
              onPress={() => {
                gotoSearchScreen(SearchType.VISITED);
              }}>
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
              <Text style={styles.text_time}>{new Date(date).toString().slice(16, 21)}</Text>
            </TouchableOpacity>
          </TagWithIcon>
          {datePickerVisible && (
            <DateTimePicker
              // style={{backgroundColor: '#fff'}}
              //@ts-ignore
              value={new Date(date)}
              //@ts-ignore
              mode={modeCalendar}
              display="default"
              onChange={modeCalendar == "date" ? onChangeDate : onChangeTime}
            />
          )}
          <TagWithIcon iconName="medicinebox" iconFont="AntDesign">
            <FlatList
              renderItem={({ item }) => (
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
              <Text style={{ paddingHorizontal: 20 }}>
                {STRINGS.VISITED_SCREEN.ADD_MEDICINE}
              </Text>
            </TouchableOpacity>
          </TagWithIcon>
          <TagWithIcon iconName="notes" iconFont="MaterialIcons">
            <TextInput
              value={descript}
              multiline
              onChangeText={setDescript}
              placeholder={STRINGS.VISITED_SCREEN.NOTE}
            />
          </TagWithIcon>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
export default VisitedScreen;


const styles = StyleSheet.create({
  text_time: {
    fontSize: FONT_SIZE.CONTENT,
    marginLeft: 6,
  },
})
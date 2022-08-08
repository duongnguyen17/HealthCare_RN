import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Asset} from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {
  AlertType,
  COLORS,
  DIMENS,
  FONT_SIZE,
  Medicine,
  PicNote,
  Schedule,
  STRINGS,
  Visited,
} from '../../common';
import ContainerView from '../../components/ContainerView';
import HairLine from '../../components/HairLine';
import {showAlert} from '../../components/HAlert';
import HButton from '../../components/HButton';
import HHeaderCommon from '../../components/HHeader/HHeaderCommon';
import ImageView from '../../components/ImageView';
import {goBack, routeParam} from '../../navigator/NavigationServices';
import {medicinesAction} from '../../reduxSaga/slices/medicinesSlice';
import {visitedsAction} from '../../reduxSaga/slices/visitedsSlice';
import {RootStateType, ScreenProps} from '../../type/type';
import {arrayUnique} from '../../utils/arrayUtils';
import {showDate, showTime} from '../../utils/dateutils';
import {getPictures, takePicture} from '../../utils/picture';
import Tag from '../main/DiaryTab/components/Tag';
import TagWithIcon from '../main/DiaryTab/components/TagWithIcon';
import ListMedicine from './components/ListMedicine';
import {LocationItem} from './components/LocationItem';
import {PreItem} from './components/PreItem';
enum ImgType {
  Prescription,
  XRay,
  Test,
}

const VisitedScreen = (props: ScreenProps) => {
  const now = useRef(Date.now());
  const _id = routeParam(props.route, '_id');
  const RBSheetImagePicker = useRef<any>();
  const dispatch = useDispatch();

  const visited = useSelector(
    (state: RootStateType) => state.visitedState.visited,
  );
  const imgType = useRef(ImgType.Prescription);

  const [title, setTitle] = useState<string>('');
  const [pre, setPre] = useState<number>();
  const [location, setLocation] = useState<number | undefined>();
  const [date, setDate] = useState(Date.now());
  const [medicines, setMedicines] = useState<Array<any>>([]);
  const [prescription, setPrescription] = useState<PicNote>();
  const [xRay, setXRay] = useState<PicNote>();
  const [test, setTest] = useState<PicNote>();
  const [descript, setDescript] = useState<string>('');
  const [schedules, setSchedules] = useState<Map<number, Schedule>>(new Map());

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  useEffect(() => {
    dispatch(visitedsAction.getVisted(_id));
  }, []);

  useEffect(() => {
    //@ts-ignore
    setTitle(visited?.title);
    //@ts-ignore
    setPre(visited?.pre);
    //@ts-ignore
    setLocation(visited?.location);
    //@ts-ignore
    setDate(visited?.date ?? date);
    //@ts-ignore
    setDescript(visited?.descript);
    //@ts-ignore
    setMedicines(visited?.medicines ?? []);
  }, [visited]);

  const onSubmit = () => {
    if (title == '' || title == undefined) {
      showAlert(
        AlertType.WARN,
        STRINGS.VISITED_SCREEN.THE_NAME_OF_EXAMINATION_CANNOT_BE_LEFT_BLANK,
      );
    } else {
      let tempVisited: Visited = {
        _id: _id ?? Date.now(),
        title,
        pre,
        location,
        descript,
        date,
        medicines,
        prescription,
        xRay,
        test,
      };
      if (!visited) {
        dispatch(visitedsAction.addVisited(tempVisited));
      } else {
        // dispatch(visitedsAction.updateVisited(tempVisited));
      }
      if (schedules.size != 0) {
        console.log('schedules', schedules)
        schedules.forEach((value, key) => {
          dispatch(medicinesAction.updateSchedule({_id: key, schedule: value}));
        });
      }
      goBack();
    }
  };

  const updateMedicine = (medicine: Medicine) => {
    // let have = false;
    // medicines.forEach((element: Medicine) => {
    //   if (element._id == medicine._id) {
    //     element.during = medicine.during;
    //     element.remind = medicine.remind;
    //     element.start = medicine.start;
    //     element.title = medicine.title;
    //     element.visitedId = medicine.visitedId;
    //     have = true;
    //   }
    // });
    // if (have) {
    //   setMedicines([...medicines]);
    // } else {
    //   setMedicines([...medicines, medicine]);
    // }
    // dispatch(medicinesAction.addTempMedicine({ medicine: null }))
  };

  const updateScredules = (medicine: number, schedule: Schedule) => {
    // console.log('schedule', schedule)
    schedules.set(medicine, schedule);
  };

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setDatePickerVisible(false);
    setTimePickerVisible(true);
  };
  const onChangeTime = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || date;
    setDate(new Date(date).setTime(new Date(currentTime).getTime()));
    setTimePickerVisible(false);
  };

  const DatePicker = useCallback(
    () => (
      <View>
        <TouchableOpacity
          onPress={() => {
            setDatePickerVisible(!datePickerVisible);
          }}
          style={{flexDirection: 'row'}}>
          <Text>Ngày khám</Text>
          <Text style={{marginLeft: 50}}>{showDate(date)}</Text>
          <Text style={styles.textTime}>{showTime(date)}</Text>
        </TouchableOpacity>

        {datePickerVisible && (
          <DateTimePicker
            //@ts-ignore
            value={new Date(date)}
            //@ts-ignore
            mode={'datetime'}
            display="default"
            onChange={onChangeDate}
          />
        )}
        {timePickerVisible && (
          <DateTimePicker
            //@ts-ignore
            value={new Date(date)}
            //@ts-ignore
            mode={'time'}
            display="default"
            onChange={onChangeTime}
          />
        )}
      </View>
    ),
    [datePickerVisible, timePickerVisible],
  );

  const takePic = async () => {
    RBSheetImagePicker.current.close();
    const photo = await takePicture();
    if (photo != null && photo != undefined) {
      const arrayUri = getUri(photo);
      switch (imgType.current) {
        case ImgType.Prescription:
          setPrescription({
            ...prescription,
            pictures: arrayUnique(
              arrayUri.concat(prescription?.pictures ?? []),
            ),
          });
          break;
        case ImgType.XRay:
          setXRay({
            ...xRay,
            pictures: arrayUnique(arrayUri.concat(xRay?.pictures ?? [])),
          });
          break;
        case ImgType.Test:
          setTest({
            ...test,
            pictures: arrayUnique(arrayUri.concat(test?.pictures ?? [])),
          });
          break;
        default:
          console.log('chưa truyền kiểu');
          break;
      }
    }
  };

  const getUri = (photo: Asset[]): Array<string | undefined> => {
    const arrayUri = photo.map((value, index) =>
      Platform.OS === 'ios' ? value.uri?.replace('file://', '') : value.uri,
    );
    return arrayUri;
  };

  const getPic = async () => {
    RBSheetImagePicker.current.close();
    const photo = await getPictures();
    if (photo != null && photo != undefined) {
      const arrayUri = getUri(photo);
      switch (imgType.current) {
        case ImgType.Prescription:
          setPrescription({
            ...prescription,
            pictures: arrayUnique(
              arrayUri.concat(prescription?.pictures ?? []),
            ),
          });
          break;
        case ImgType.XRay:
          setXRay({
            ...xRay,
            pictures: arrayUnique(arrayUri.concat(xRay?.pictures ?? [])),
          });
          break;
        case ImgType.Test:
          setTest({
            ...test,
            pictures: arrayUnique(arrayUri.concat(test?.pictures ?? [])),
          });
          break;
        default:
          console.log('chưa truyền kiểu');
          break;
      }
    }
  };

  const deletePic = (index: number) => {
    let arrayUrls;
    switch (imgType.current) {
      case ImgType.Prescription:
        arrayUrls = prescription?.pictures;
        arrayUrls?.splice(index, 1);
        setPrescription({...prescription, pictures: arrayUrls});
        break;
      case ImgType.XRay:
        arrayUrls = xRay?.pictures;
        arrayUrls?.splice(index, 1);
        setXRay({...xRay, pictures: arrayUrls});
        break;
      case ImgType.Test:
        arrayUrls = test?.pictures;
        arrayUrls?.splice(index, 1);
        setTest({...test, pictures: arrayUrls});
        break;
      default:
        console.log('chưa truyền kiểu');
        break;
    }
  };

  const openSheet = (type: ImgType) => {
    imgType.current = type;
    RBSheetImagePicker.current.open();
  };

  const changeLocation = (_id: number) => {
    setLocation(_id);
    goBack();
  };

  const changePre = (_id: number) => {
    setPre(_id);
    goBack();
  };

  const addMedicine = (_id: number) => {
    if (!medicines.includes(_id)) {
      setMedicines([_id, ...medicines]);
    }
    goBack();
  };

  const deleteVisited = () => {
    dispatch(visitedsAction.deleteVisited(_id));
    goBack();
  };

  const setNoteTest = (text: string) => {
    setTest({
      pictures: test?.pictures,
      note: text,
    });
  };

  const setNoteXRay = (text: string) => {
    setXRay({
      pictures: xRay?.pictures,
      note: text,
    });
  };

  const setNotePrescription = (text: string) => {
    setPrescription({
      pictures: prescription?.pictures,
      note: text,
    });
  };

  return (
    <ContainerView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <HHeaderCommon
            renderTitle={() => <Text style={styles.textTitle}>Lần Khám</Text>}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <Tag>
              <TextInput
                style={{fontSize: 30}}
                value={title}
                placeholder={STRINGS.VISITED_SCREEN.VISITED_NAME}
                multiline
                numberOfLines={2}
                onChangeText={setTitle}
              />
            </Tag>
            <TagWithIcon iconName="event-note" iconFont="MaterialIcons">
              <PreItem _id={pre} onPress={changePre} />
            </TagWithIcon>
            <TagWithIcon iconName="map-marker" iconFont="FontAwesome">
              <LocationItem _id={location} onPress={changeLocation} />
            </TagWithIcon>
            <TagWithIcon
              iconName="calendar"
              iconFont="FontAwesome"
              iconSize={24}>
              <DatePicker />
            </TagWithIcon>
            <TagWithIcon iconName="medicinebox" iconFont="AntDesign">
              <ListMedicine
                visitedId={now.current}
                medicineIds={medicines}
                addMedicine={addMedicine}
                updateScredules={updateScredules}
              />
              <HairLine style={{width: '60%', marginVertical: 10}} />
              <ImageView
                uris={prescription?.pictures ?? []}
                deletePic={deletePic}
              />
              <TouchableOpacity
                onPress={() => {
                  openSheet(ImgType.Prescription);
                }}>
                <Text
                  style={{
                    paddingHorizontal: 20,
                    alignSelf: 'center',
                    color: COLORS.BLUE,
                  }}>
                  Thêm hình ảnh đơn thuốc
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderColor: COLORS.GRAY_DECOR,
                  borderWidth: 1,
                  marginTop: 10,
                }}>
                <TextInput
                  multiline={true}
                  onChangeText={setNotePrescription}
                  style={{fontSize: 14}}
                  placeholder={'Ghi chú'}
                />
              </View>
            </TagWithIcon>
            <TagWithIcon iconName="x-ray" iconFont="FontAwesome5">
              <Text>Chuẩn đoán hình ảnh</Text>
              <ImageView uris={xRay?.pictures ?? []} deletePic={deletePic} />
              <TouchableOpacity
                onPress={() => {
                  openSheet(ImgType.XRay);
                }}>
                <Text
                  style={{
                    paddingVertical: 10,
                    alignSelf: 'center',
                    color: COLORS.BLUE,
                  }}>
                  Thêm hình ảnh
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderColor: COLORS.GRAY_DECOR,
                  borderWidth: 1,
                  marginTop: 10,
                }}>
                <TextInput
                  multiline={true}
                  onChangeText={setNoteXRay}
                  style={{fontSize: 14}}
                  placeholder={'Ghi chú'}
                />
              </View>
            </TagWithIcon>
            <TagWithIcon iconName="test-tube" iconFont="Fontisto">
              <Text>Kết quả xét nghiệm</Text>
              <ImageView uris={test?.pictures ?? []} deletePic={deletePic} />
              <TouchableOpacity
                onPress={() => {
                  openSheet(ImgType.Test);
                }}>
                <Text
                  style={{
                    paddingVertical: 10,
                    alignSelf: 'center',
                    color: COLORS.BLUE,
                  }}>
                  Thêm hình ảnh
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  borderColor: COLORS.GRAY_DECOR,
                  borderWidth: 1,
                  marginTop: 10,
                }}>
                <TextInput
                  multiline={true}
                  onChangeText={setNoteTest}
                  style={{fontSize: 14}}
                  placeholder={'Ghi chú'}
                />
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
            <HButton
              style={styles.btnSave}
              title="Lưu"
              textStyle={styles.textBtnLogin}
              type={'normal'}
              onPress={onSubmit}
            />
            <HButton
              style={styles.btnSave}
              title="Xóa"
              textStyle={styles.textBtnLogin}
              type={'delete'}
              onPress={deleteVisited}
            />
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
      <RBSheet
        ref={RBSheetImagePicker}
        height={2 * DIMENS.BUTTON_RBSHEET_HEIGHT}>
        <TouchableOpacity style={styles.option_container} onPress={takePic}>
          <Text style={styles.title_option}>Chụp ảnh</Text>
        </TouchableOpacity>
        <HairLine style={styles.hairline_option} />
        <TouchableOpacity style={styles.option_container} onPress={getPic}>
          <Text style={styles.title_option}>Thư viện</Text>
        </TouchableOpacity>
      </RBSheet>
    </ContainerView>
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
    marginVertical: 10,
    marginHorizontal: 40,
  },
  textTitle: {
    fontSize: FONT_SIZE.BIG_HEADER,
    color: COLORS.BLACK,
    fontWeight: 'bold',
  },
  option_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_option: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZE.HEADER_TAG,
  },
  hairline_option: {
    width: '90%',
    backgroundColor: COLORS.GRAY_DECOR,
  },
  textBtnLogin: {
    fontSize: 16,
  },
});

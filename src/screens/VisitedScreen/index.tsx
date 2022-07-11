import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Keyboard, Platform, ScrollView, StyleSheet, Text,
  TextInput, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  AlertType,
  COLORS,
  DIMENS,
  FONT_SIZE,
  Medicine, PicNote, SearchType,
  STRINGS, Visited
} from '../../common';
import RBSheet from 'react-native-raw-bottom-sheet';
import ContainerView from '../../components/ContainerView';
import HairLine from '../../components/HairLine';
import { showAlert } from '../../components/HAlert';
import HHeaderCommon from '../../components/HHeader/HHeaderCommon';
import HIcon from '../../components/HIcon';
import MedicineItem from '../../components/MedicineItem';
import {
  goBack,
  navigateTo,
  navigationAvailbe,
  routeParam
} from '../../navigator/NavigationServices';
import { medicinesAction } from '../../reduxSaga/slices/medicinesSlice';
import { visitedsAction } from '../../reduxSaga/slices/visitedsSlice';
import { RootStateType, ScreenProps } from '../../type/type';
import Tag from '../main/DiaryTab/components/Tag';
import TagWithIcon from '../main/DiaryTab/components/TagWithIcon';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { getPicture, getPictures, takePicture } from '../../utils/picture';
import ImageView from '../../components/ImageView';
import { arrayUnique } from '../../utils/arrayUtils';
import ListMedicine from './components/ListMedicine';
import { LocationItem } from './components/LocationItem';
enum ImgType {
  Prescription,
  XRay,
  Test
}

const VisitedScreen = (props: ScreenProps) => {
  const _id = routeParam(props.route, '_id', Date.now());
  const RBSheetImagePicker = useRef<any>()
  const dispatch = useDispatch();
  const tempMedicine = useSelector((state: RootStateType) => state.medicineState.tempMedicine)
  const visited: Visited | null | undefined = useSelector((state: RootStateType) => state.visitedState.tempVisited)
  const imgType = useRef(ImgType.Prescription)

  const [title, setTitle] = useState<string>('');
  const [pre, setPre] = useState<number | null>();
  const [location, setLocation] = useState<number | undefined>();
  const [date, setDate] = useState(Date.now());
  const [medicines, setMedicines] = useState<Array<number>>([]);
  const [prescription, setPrescription] = useState<PicNote>()
  const [xRay, setXRay] = useState<PicNote>()
  const [test, setTest] = useState<PicNote>()
  const [descript, setDescript] = useState<string>('');

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);


  useEffect(() => {
    if (_id != undefined) {
      dispatch(visitedsAction.getVisted({ _id: _id }))
    }
  }, [])

  useEffect(() => {
    if (_id != undefined && visited != null && visited != undefined) {
      setTitle(visited?.title)
      setPre(visited?.pre)
      setLocation(visited?.location?.name ?? "")
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
      let tempVisited = {
        _id: _id,
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

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setDatePickerVisible(false)
    setTimePickerVisible(true)
  };
  const onChangeTime = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || date;
    setDate(new Date(date).setTime(new Date(currentTime).getTime()));
    setTimePickerVisible(false);
  };

  const gotoListVisitedScreen = () => {
    navigateTo(STRINGS.ROUTE.LIST_VISITED_SCREEN);
  };

  const gotoListLocationScreen = () => {
    navigateTo(STRINGS.ROUTE.LIST_LOCATION_SCREEN)
  }

  const gotoMedicineScreen = (medicine: Medicine | null = null) => {
    if (title == '' || title == undefined) {
      showAlert(AlertType.WARN, STRINGS.VISITED_SCREEN.THE_NAME_OF_EXAMINATION_CANNOT_BE_LEFT_BLANK);
    } else
      navigateTo(STRINGS.ROUTE.DIARY.MEDICINE, {
        data: { title: title, date: date },
        medicine,
      });
  };

  const DatePicker = useCallback(() => (
    <View >
      <TouchableOpacity
        onPress={() => {
          setDatePickerVisible(!datePickerVisible);
        }}
        style={{ flexDirection: 'row' }}>
        <Text>Ngày khám</Text>
        <Text style={{ marginLeft: 50 }}>
          {new Date(date).toString().slice(0, 10)}
        </Text>
        <Text style={styles.textTime}>{new Date(date).toString().slice(16, 21)}</Text>
      </TouchableOpacity>

      {
        datePickerVisible && (
          <DateTimePicker
            //@ts-ignore
            value={new Date(date)}
            //@ts-ignore
            mode={"datetime"}
            display="default"
            onChange={onChangeDate}
          />
        )
      }
      {
        timePickerVisible && (
          <DateTimePicker
            //@ts-ignore
            value={new Date(date)}
            //@ts-ignore
            mode={"time"}
            display="default"
            onChange={onChangeTime}
          />
        )
      }
    </View>
  ), [datePickerVisible, timePickerVisible])

  const takePic = async () => {
    RBSheetImagePicker.current.close()
    const photo = await takePicture()
    if (photo != null && photo != undefined) {
      const arrayUri = getUri(photo)
      switch (imgType.current) {
        case ImgType.Prescription:
          setPrescription({ ...prescription, pictures: arrayUnique(arrayUri.concat(prescription?.pictures ?? [])) })
          break;
        case ImgType.XRay:
          setXRay({ ...xRay, pictures: arrayUnique(arrayUri.concat(xRay?.pictures ?? [])) })
          break;
        case ImgType.Test:
          setTest({ ...test, pictures: arrayUnique(arrayUri.concat(test?.pictures ?? [])) })
          break;
        default:
          console.log('chưa truyền kiểu')
          break;
      }
    }
  }

  const getUri = (photo: Asset[]): Array<string | undefined> => {
    const arrayUri = photo.map((value, index) => (Platform.OS === 'ios' ? value.uri?.replace('file://', '') : value.uri))
    return arrayUri
  }

  const getPic = async () => {
    RBSheetImagePicker.current.close()
    const photo = await getPictures()
    if (photo != null && photo != undefined) {
      const arrayUri = getUri(photo)
      switch (imgType.current) {
        case ImgType.Prescription:
          setPrescription({ ...prescription, pictures: arrayUnique(arrayUri.concat(prescription?.pictures ?? [])) })
          break;
        case ImgType.XRay:
          setXRay({ ...xRay, pictures: arrayUnique(arrayUri.concat(xRay?.pictures ?? [])) })
          break;
        case ImgType.Test:
          setTest({ ...test, pictures: arrayUnique(arrayUri.concat(test?.pictures ?? [])) })
          break;
        default:
          console.log('chưa truyền kiểu')
          break;
      }
    }
  }

  const deletePic = (index: number) => {
    let arrayUrls
    switch (imgType.current) {
      case ImgType.Prescription:
        arrayUrls = prescription?.pictures
        arrayUrls?.splice(index, 1)
        setPrescription({ ...prescription, pictures: arrayUrls })
        break;
      case ImgType.XRay:
        arrayUrls = xRay?.pictures
        arrayUrls?.splice(index, 1)
        setXRay({ ...xRay, pictures: arrayUrls })
        break;
      case ImgType.Test:
        arrayUrls = test?.pictures
        arrayUrls?.splice(index, 1)
        setTest({ ...test, pictures: arrayUrls })
        break;
      default:
        console.log('chưa truyền kiểu')
        break;
    }
  }

  const opneRBSHeet = (type: ImgType) => {
    imgType.current = type
    RBSheetImagePicker.current.open()
  }

  const changeLocation = (_id: number) => {
    setLocation(_id)
    goBack()
  }

  const addMedicine = (_id: number) => {
    if (!medicines.includes(_id)) {
      setMedicines([_id, ...medicines])
    }
    goBack()
  }

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
          <ScrollView
            showsVerticalScrollIndicator={false}
          >
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
                onPress={gotoListVisitedScreen}>
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
                        Không có
                      </Text>
                    )}
                  </Text>
                </View>
                <HIcon font="MaterialIcons" name="arrow-forward-ios" size={18} />
              </TouchableOpacity>
            </TagWithIcon>
            <TagWithIcon iconName="map-marker" iconFont="FontAwesome">
              <LocationItem _id={location} onPress={changeLocation} />
            </TagWithIcon>
            <TagWithIcon iconName="calendar" iconFont="FontAwesome" iconSize={24}>
              <DatePicker />
            </TagWithIcon>
            <TagWithIcon iconName="medicinebox" iconFont="AntDesign">
              <ListMedicine medicineIds={medicines} addMedicine={addMedicine} />
              <HairLine style={{ width: '60%', marginVertical: 10 }} />
              <ImageView uris={prescription?.pictures ?? []} deletePic={deletePic} />
              <TouchableOpacity
                onPress={() => {
                  opneRBSHeet(ImgType.Prescription);
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
              <ImageView uris={xRay?.pictures ?? []} deletePic={deletePic} />
              <TouchableOpacity
                onPress={() => {
                  opneRBSHeet(ImgType.XRay);
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
              <ImageView uris={test?.pictures ?? []} deletePic={deletePic} />
              <TouchableOpacity
                onPress={() => {
                  opneRBSHeet(ImgType.Test);
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
      <RBSheet ref={RBSheetImagePicker} height={2 * DIMENS.BUTTON_RBSHEET_HEIGHT}>
        <TouchableOpacity style={styles.option_container} onPress={takePic}>
          <Text style={styles.title_option}>Chụp ảnh</Text>
        </TouchableOpacity>
        <HairLine style={styles.hairline_option} />
        <TouchableOpacity style={styles.option_container} onPress={getPic}>
          <Text style={styles.title_option}>Thư viện</Text>
        </TouchableOpacity>
      </RBSheet>
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
  option_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }, title_option: {
    color: COLORS.BLACK,
    fontSize: FONT_SIZE.HEADER_TAG
  },
  hairline_option: {
    width: '90%',
    backgroundColor: COLORS.GRAY_DECOR,
  },
})
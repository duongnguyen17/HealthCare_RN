import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
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
  COLORS,
  DIMENS,
  FONT_SIZE,
  PicNote,
  Schedule,
  STRINGS,
  TimeUnit,
} from '../../common';
import ContainerView from '../../components/ContainerView';
import HairLine from '../../components/HairLine';
import HButton from '../../components/HButton';
import HeaderCommon from '../../components/HHeader/HHeaderCommon';
import ImageView from '../../components/ImageView';
import {goBack, routeParam} from '../../navigator/NavigationServices';
import {medicinesAction} from '../../reduxSaga/slices/medicinesSlice';
import {RootStateType, ScreenProps} from '../../type/type';
import {arrayUnique} from '../../utils/arrayUtils';
import {getPictures, getUri, takePicture} from '../../utils/picture';
import Tag from '../main/DiaryTab/components/Tag';
import TagWithIcon from '../main/DiaryTab/components/TagWithIcon';

const MedicineScreen = (props: ScreenProps) => {
  const _id = routeParam(props.route, '_id');
  const visitedId = routeParam(props.route, 'visitedId');

  const dispatch = useDispatch();
  const medicine = useSelector(
    (state: RootStateType) => state.medicineState.medicine,
  );
  const RBSheetImagePicker = useRef<any>();
  const [title, setTitle] = useState<string>('');
  const [infor, setInfor] = useState<PicNote>({});
  //   const [reminds, setReminds] = useState<Array<Remind | any>>([]);
  const [timeUnit, setTimeUnit] = useState<TimeUnit>(TimeUnit.DAY);
  const [count, setCount] = useState<string>('0');
  const [startDate, setStartDate] = useState<any>(new Date());
  const [schedules, setSchedules] = useState<Array<Schedule>>([]);

  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);

  useEffect(() => {
    dispatch(medicinesAction.getMedicine(_id));
  }, []);

  useEffect(() => {
    //@ts-ignore
    setTitle(medicine?.title);
    //@ts-ignore
    setInfor(medicine?.infor);
    //@ts-ignore
    setSchedules(medicine?.schedules);
  }, [medicine]);

  const onSubmit = () => {
    // let remindTimeArr = reminds.map(e => e.time);
    // let isDuplicate = remindTimeArr.some(
    //   (e, i) => remindTimeArr.indexOf(e) != i,
    // );
    // if (isDuplicate) {
    //   showAlert(
    //     AlertType.WARN,
    //     STRINGS.MEDICINE_SCREEN.TIME_REMIND_DO_NOT_DUPLICATE,
    //   );
    // } else if (title == '' || title == undefined) {
    //   showAlert(
    //     AlertType.WARN,
    //     STRINGS.MEDICINE_SCREEN.THE_NAME_OF_DRUG_CANNOT_BE_LEFT_BLANK,
    //   );
    // } else if (!!medicine?.visitedId) {
    //   //nếu là update
    //   dispatch(
    //     medicinesAction.updateMedicine({
    //       _id: medicine._id,
    //       title,
    //       during: calDuring(count, timeUnit),
    //       remind: reminds,
    //       start: medicine?.start,
    //       visitedId: medicine?.visitedId,
    //     }),
    //   );
    //   goBack();
    // } else {
    //   //nếu là tạo mới
    //   dispatch(
    //     medicinesAction.addMedicine({
    //       medicine: {
    //         _id: Date.now(),
    //         title,
    //         infor,
    //         schedules,
    //       },
    //     }),
    //   );
    //   goBack();
    // }
    //nếu là tạo mới
    dispatch(
      medicinesAction.addMedicine({
        medicine: {
          _id: Date.now(),
          title,
          infor,
          schedules,
        },
      }),
    );
    goBack();
  };

  const deleteMedicine = () => {
    dispatch(medicinesAction.deleteMedicine(_id));
    goBack();
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

  const addNote = (text: string) => {
    setInfor({
      ...infor,
      note: text,
    });
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

  const Schedules = useCallback(
    () =>
      _id !== undefined ? (
        <TagWithIcon iconName="infocirlceo" iconFont="AntDesign">
          <Text style={{fontSize: FONT_SIZE.HEADER_TAG}}>
            Các lịch uống thuốc
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <View style={{marginTop: 10}}></View>
          </TouchableOpacity>
        </TagWithIcon>
      ) : null,
    [schedules],
  );

  const Visiteds = useCallback(
    () =>
      _id !== undefined ? (
        <TagWithIcon iconName="infocirlceo" iconFont="AntDesign">
          <Text style={{fontSize: FONT_SIZE.HEADER_TAG}}>
            Các lần khám sử dụng
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <View style={{marginTop: 10}}></View>
          </TouchableOpacity>
        </TagWithIcon>
      ) : null,
    [schedules],
  );

  const getPic = async () => {
    RBSheetImagePicker.current.close();
    const photo = await getPictures();
    if (photo != null && photo != undefined) {
      const arrayUri = getUri(photo);
      setInfor({
        ...infor,
        pictures: arrayUnique(arrayUri.concat(infor?.pictures ?? [])),
      });
    }
  };

  const takePic = async () => {
    RBSheetImagePicker.current.close();
    const photo = await takePicture();
    if (photo != null && photo != undefined) {
      const arrayUri = getUri(photo);

      setInfor({
        ...infor,
        pictures: arrayUnique(arrayUri.concat(infor?.pictures ?? [])),
      });
    }
  };

  const openSheet = () => {
    RBSheetImagePicker.current.open();
  };

  const deletePic = (index: number) => {
    let arrayUrls = infor?.pictures;
    arrayUrls?.splice(index, 1);
    setInfor({...infor, pictures: arrayUrls});
  };

  return (
    <ContainerView>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.container}>
          <HeaderCommon
            onPressLeftIcon={() => {
              goBack();
            }}
            renderTitle={() => (
              <Text
                style={{
                  fontSize: FONT_SIZE.BIG_HEADER,
                  color: COLORS.BLACK,
                  fontWeight: 'bold',
                }}>
                Thuốc
              </Text>
            )}
          />
          <ScrollView>
            <Tag>
              <TextInput
                style={{fontSize: 30}}
                value={title}
                placeholder={STRINGS.MEDICINE_SCREEN.MEDICINE_NAME}
                multiline
                onChangeText={setTitle}
              />
            </Tag>
            <TagWithIcon iconName="infocirlceo" iconFont="AntDesign">
              <Text style={{fontSize: FONT_SIZE.HEADER_TAG}}>
                Thông tin thuốc
              </Text>
              <ImageView uris={infor?.pictures ?? []} deletePic={deletePic} />
              <TouchableOpacity onPress={openSheet}>
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
                  style={{fontSize: 14}}
                  placeholder={'Ghi chú'}
                  onChangeText={addNote}
                />
              </View>
            </TagWithIcon>
            {/* <AddSchedule /> */}
            <Visiteds />
            <Schedules />
            <HButton
              style={styles.btnSave}
              title="Lưu"
              textStyle={styles.textBtnLogin}
              type={'normal'}
              onPress={onSubmit}
            />
            {/* <HButton
              style={styles.btnSave}
              title="Xóa"
              textStyle={styles.textBtnLogin}
              type={'delete'}
              onPress={deleteMedicine}
            /> */}
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
export default MedicineScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textTime: {
    fontSize: FONT_SIZE.CONTENT,
    marginLeft: 6,
  },
  btnSave: {
    marginVertical: 10,
    marginHorizontal: 40,
  },
  textBtnLogin: {
    fontSize: 16,
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
});

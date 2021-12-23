import React, {useRef, useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootStateType} from '../../type/type';
import HIcon from '../../components/HIcon';
import {
  AlertType,
  COLORS,
  EventType,
  FONT_SIZE,
  SCREEN,
  TYPE_SHOW,
} from '../../common';
import {ScreenProps} from '../../type/type';
import HHeader from '../../components/HHeader';
import HDayTag from '../../components/HDayTag';
import ExtendDiary, {TypeExtend} from './components/ExtendDiary';
import {showAlert} from '../../components/HAlert';
import {findSomeDay} from '../../utils/dateutils';
import {eventAction} from '../../reduxSaga/slices/eventSlice';
import {useIsFocused} from '@react-navigation/native';

const Diary = (props: ScreenProps) => {
  const allEvent = useSelector((state: RootStateType) => state.eventState.all);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const list = useRef<any>();
  const [extendVisible, setExtendVisible] = useState<boolean>(false);
  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);
  const [typeExtend, setTypeExtend] = useState<TypeExtend>(TypeExtend.calendar);
  const [data, setData] = useState<Array<Object>>([]);
  const [eventType, setEventType] = useState<TYPE_SHOW>(TYPE_SHOW.ALL);

  useEffect(() => {
    isFocused && dispatch(eventAction.getAllEvent());
  }, [isFocused]);

  useEffect(() => {
    //filter data
    if (eventType == TYPE_SHOW.ALL) {
      setData(allEvent);
    } else {
      let dataTemp: Array<Object> = [];
      allEvent.forEach(element => {
        // @ts-ignore
        let arr = element.event.filter(e => e.type == eventType);
        if (arr.length != 0) dataTemp.push({date: element.date, event: arr});
      });
      setData(dataTemp);
    }
  }, [eventType, allEvent]);

  const gotoSearchScreen = (): void => {
    props?.navigation?.navigate(SCREEN.SEARCH);
  };
  const renderItem = ({item}: any) => <HDayTag data={item} />;

  const showHideExtend = useCallback(
    (type: TypeExtend): void => {
      if (extendVisible && type != typeExtend) {
        setTypeExtend(type);
      } else {
        setExtendVisible(!extendVisible);
        setTypeExtend(type);
      }
    },
    [extendVisible],
  );
  // chưa xong chỗ này, chưa tính toán được offset
  const getItemLayout = (data: any, index: number) => ({
    length: 170,
    offset: 170 * index,
    index,
  });
  const scrollToSomeDay = (someDay: Date) => {
    const iCurrDay: number = findSomeDay(someDay, data);
    if (iCurrDay == -1)
      showAlert(AlertType.SUCCESS, 'Hôm nay không có sự kiện nào');
    else {
      list.current.scrollToIndex({animated: true, index: iCurrDay});
    }
  };
  // console.log(`data`, data);
  return (
    <View style={styles.container}>
      <HHeader>
        <TouchableOpacity
          onPress={() => {
            showHideExtend(TypeExtend.option);
          }}>
          <HIcon name="three-bars" font="Octicons" size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            showHideExtend(TypeExtend.calendar);
          }}>
          <Text style={{fontSize: FONT_SIZE.CONTENT}}>Tháng 12</Text>
          <HIcon
            font="Octicons"
            name={calendarVisible ? 'triangle-down' : 'triangle-up'}
            style={{marginLeft: 10}}
            size={16}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={gotoSearchScreen}>
            <HIcon font="Octicons" name="search" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginHorizontal: 20}}
            onPress={() => {
              scrollToSomeDay(new Date());
            }}>
            <HIcon font="FontAwesome5" name="calendar-day" />
          </TouchableOpacity>
        </View>
      </HHeader>
      <ExtendDiary
        type={typeExtend}
        visible={extendVisible}
        eventType={eventType}
        setEventType={setEventType}
      />
      <View>
        {data.length == 0 ? (
          <Text
            style={{
              color: COLORS.GRAY_TEXT_1,
              fontSize: FONT_SIZE.TITLE,
              alignSelf: 'center',
              marginTop: 50,
            }}>
            Tháng này không có sự kiện nào
          </Text>
        ) : (
          /* chỗ này yêu cầu phải có 1 renderItem nhưng mình dùng CellRendererComponent nên nó báo lỗi
           @ts-ignore */
          <FlatList
            ref={list}
            showsVerticalScrollIndicator={false}
            CellRendererComponent={renderItem}
            data={data}
            getItemLayout={getItemLayout}
            // onScroll={e => {
            //   console.log(e.nativeEvent.contentOffset.y);
            // }}
          />
        )}
      </View>
      <TouchableOpacity
        onPress={() => {
          props.navigation?.navigate(SCREEN.DIARY.VISITED);
        }}
        style={{
          position: 'absolute',
          bottom: 30,
          right: 30,
          borderRadius: 30,
          backgroundColor: '#00aaff',
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <HIcon
          font="MaterialCommunityIcons"
          name="plus"
          color="#fff"
          size={35}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Diary;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export interface DateData {
  date: Date;
  event: Array<Object>;
}

interface EventVisit {}
interface EventMedicine {
  title: 'Panadon';
  type: EventType;
  visited: VisitedType;
  time: string;
  amount: string;
  more: string;
}
interface VisitedType {
  title: string;
}
// const dataEx = [
//   {
//     date: new Date('2021-11-25T06:23:21.318Z'),
//     event: [
//       {
//         title: 'Panadon',
//         type: EventType.MEDICINE,
//         visited: {title: 'Đau dạ dày'},
//         time: '09:00',
//         amount: '2 - 4 viên',
//         more: 'Sau ăn',
//       },
//       {
//         title: 'Đi khám dạ dày',
//         type: EventType.VISITED,
//         locale: 'BV Bạch Mai',
//         more: 'mang theo BHXH',
//         time: '10:00',
//       },
//     ],
//   },
//   {
//     date: new Date('2021-11-27T06:23:21.318Z'),
//     event: [
//       {
//         title: 'Panadon',
//         type: EventType.MEDICINE,
//         visited: {title: 'Đau dạ dày'},
//         time: '09:00',
//         amount: '2 - 4 viên',
//         more: 'Sau ăn',
//       },
//       {
//         title: 'Đi khám dạ dày',
//         type: EventType.VISITED,
//         locale: 'BV Bạch Mai',
//         more: 'mang theo BHXH',
//         time: '10:00',
//       },
//     ],
//   },
//   {
//     date: new Date('2021-12-18T06:23:21.318Z'),
//     event: [
//       {
//         title: 'Panadon',
//         type: EventType.MEDICINE,
//         visited: {title: 'Đau dạ dày'},
//         time: '09:00',
//         amount: '2 - 4 viên',
//         more: 'Sau ăn',
//       },
//       {
//         title: 'Đi khám dạ dày',
//         type: EventType.VISITED,
//         locale: 'BV Bạch Mai',
//         more: 'mang theo BHXH',
//         time: '10:00',
//       },
//     ],
//   },
//   {
//     date: new Date('2021-12-19T06:23:21.318Z'),
//     event: [
//       {
//         title: 'Panadon',
//         type: EventType.MEDICINE,
//         visited: {title: 'Đau dạ dày'},
//         time: '09:00',
//         amount: '2 - 4 viên',
//         more: 'Sau ăn',
//       },
//       {
//         title: 'Đi khám dạ dày',
//         type: EventType.VISITED,
//         locale: 'BV Bạch Mai',
//         more: 'mang theo BHXH',
//         time: '10:00',
//       },
//     ],
//   },
//   {
//     date: new Date('2021-12-20T06:23:21.318Z'),
//     event: [
//       {
//         title: 'Panadon',
//         type: EventType.MEDICINE,
//         visited: {title: 'Đau dạ dày'},
//         time: '09:00',
//         amount: '2 - 4 viên',
//         more: 'Sau ăn',
//       },
//       {
//         title: 'Đi khám dạ dày',
//         type: EventType.VISITED,
//         locale: 'BV Bạch Mai',
//         more: 'mang theo BHXH',
//         time: '10:00',
//       },
//       {
//         title: 'Panadon',
//         type: EventType.MEDICINE,
//         visited: {title: 'Đau dạ dày'},
//         time: '19:00',
//         amount: '2 - 4 viên',
//         more: 'Trước ăn',
//       },
//     ],
//   },
//   {
//     date: new Date('2021-12-22T06:23:21.318Z'),
//     event: [
//       {
//         title: 'Panadon',
//         type: EventType.MEDICINE,
//         visited: {title: 'Đau dạ dày'},
//         time: '09:00',
//         amount: '2 - 4 viên',
//         more: 'Sau ăn',
//       },
//       {
//         title: 'Đi khám dạ dày',
//         type: EventType.VISITED,
//         locale: 'BV Bạch Mai',
//         more: 'mang theo BHXH',
//         time: '10:00',
//       },
//     ],
//   },
//   {
//     date: new Date('2021-12-25T06:23:21.318Z'),
//     event: [
//       {
//         title: 'Panadon',
//         type: EventType.MEDICINE,
//         visited: {title: 'Đau dạ dày'},
//         time: '09:00',
//         amount: '2 - 4 viên',
//         more: 'Sau ăn',
//       },
//       {
//         title: 'Đi khám dạ dày',
//         type: EventType.VISITED,
//         locale: 'BV Bạch Mai',
//         more: 'mang theo BHXH',
//         time: '10:00',
//       },
//     ],
//   },
//   {
//     date: new Date('2021-12-26T06:23:21.318Z'),
//     event: [
//       {
//         title: 'Panadon',
//         type: EventType.MEDICINE,
//         visited: {title: 'Đau dạ dày'},
//         time: '09:00',
//         amount: '2 - 4 viên',
//         more: 'Sau ăn',
//       },
//       {
//         title: 'Đi khám dạ dày',
//         type: EventType.VISITED,
//         locale: 'BV Bạch Mai',
//         more: 'mang theo BHXH',
//         time: '10:00',
//       },
//     ],
//   },
//   {
//     date: new Date('2021-12-27T06:23:21.318Z'),
//     event: [
//       {
//         title: 'Panadon',
//         type: EventType.MEDICINE,
//         visited: {title: 'Đau dạ dày'},
//         time: '09:00',
//         amount: '2 - 4 viên',
//         more: 'Sau ăn',
//       },
//       {
//         title: 'Đi khám dạ dày',
//         type: EventType.VISITED,
//         locale: 'BV Bạch Mai',
//         more: 'mang theo BHXH',
//         time: '10:00',
//       },
//     ],
//   },
//   {
//     date: new Date('2021-12-28T06:23:21.318Z'),
//     event: [
//       {
//         title: 'Panadon',
//         type: EventType.MEDICINE,
//         visited: {title: 'Đau dạ dày'},
//         time: '09:00',
//         amount: '2 - 4 viên',
//         more: 'Sau ăn',
//       },
//       {
//         title: 'Đi khám dạ dày',
//         type: EventType.VISITED,
//         locale: 'BV Bạch Mai',
//         more: 'mang theo BHXH',
//         time: '10:00',
//       },
//     ],
//   },
//   {
//     date: new Date('2021-12-29T06:23:21.318Z'),
//     event: [
//       {
//         title: 'Panadon',
//         type: EventType.MEDICINE,
//         visited: {title: 'Đau dạ dày'},
//         time: '09:00',
//         amount: '2 - 4 viên',
//         more: 'Sau ăn',
//       },
//       {
//         title: 'Đi khám dạ dày',
//         type: EventType.VISITED,
//         locale: 'BV Bạch Mai',
//         more: 'mang theo BHXH',
//         time: '10:00',
//       },
//     ],
//   },
// ];

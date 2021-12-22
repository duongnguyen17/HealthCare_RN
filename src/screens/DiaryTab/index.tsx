import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import {hideLoading, showLoading} from '../../components/Loading';
import {useSelector, useDispatch} from 'react-redux';
import {RootStateType} from '../../type/type';
import {testAction} from '../../reduxSaga/slices/testSlice';
import HIcon from '../../components/HIcon';
import {AlertType, EventType, FONT_SIZE, SCREEN} from '../../common';
import MedicineItem from '../../components/MedicineItem';
import {ScreenProps} from '../../type/type';
import HHeader from '../../components/HHeader';
import HDayTag from '../../components/HDayTag';
import ExtendDiary, {TypeExtend} from './components/ExtendDiary';
import {showAlert} from '../../components/HAlert';
import {findSomeDay} from '../../utils/dateutils';

const Diary = (props: ScreenProps) => {
  // const count = useSelector((state: RootStateType) => state.testState.count)
  // const dispatch = useDispatch()
  const list = useRef<any>();
  const [extendVisible, setExtendVisible] = useState<boolean>(false);
  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);
  const [typeExtend, setTypeExtend] = useState<TypeExtend>(TypeExtend.calendar);
  const [data, setData] = useState<Array<Object>>([
    {
      date: new Date('2021-11-25T06:23:21.318Z'),
      event: [
        {
          title: 'Panadon',
          type: EventType.MEDICINE,
          visited: {title: 'Đau dạ dày'},
          time: '09:00',
          amount: '2 - 4 viên',
          more: 'Sau ăn',
        },
        {
          title: 'Đi khám dạ dày',
          type: EventType.VISITED,
          locale: 'BV Bạch Mai',
          more: 'mang theo BHXH',
          time: '10:00',
        },
      ],
    },
    {
      date: new Date('2021-11-27T06:23:21.318Z'),
      event: [
        {
          title: 'Panadon',
          type: EventType.MEDICINE,
          visited: {title: 'Đau dạ dày'},
          time: '09:00',
          amount: '2 - 4 viên',
          more: 'Sau ăn',
        },
        {
          title: 'Đi khám dạ dày',
          type: EventType.VISITED,
          locale: 'BV Bạch Mai',
          more: 'mang theo BHXH',
          time: '10:00',
        },
      ],
    },
    {
      date: new Date('2021-12-18T06:23:21.318Z'),
      event: [
        {
          title: 'Panadon',
          type: EventType.MEDICINE,
          visited: {title: 'Đau dạ dày'},
          time: '09:00',
          amount: '2 - 4 viên',
          more: 'Sau ăn',
        },
        {
          title: 'Đi khám dạ dày',
          type: EventType.VISITED,
          locale: 'BV Bạch Mai',
          more: 'mang theo BHXH',
          time: '10:00',
        },
      ],
    },
    {
      date: new Date('2021-12-19T06:23:21.318Z'),
      event: [
        {
          title: 'Panadon',
          type: EventType.MEDICINE,
          visited: {title: 'Đau dạ dày'},
          time: '09:00',
          amount: '2 - 4 viên',
          more: 'Sau ăn',
        },
        {
          title: 'Đi khám dạ dày',
          type: EventType.VISITED,
          locale: 'BV Bạch Mai',
          more: 'mang theo BHXH',
          time: '10:00',
        },
      ],
    },
    {
      date: new Date('2021-12-20T06:23:21.318Z'),
      event: [
        {
          title: 'Panadon',
          type: EventType.MEDICINE,
          visited: {title: 'Đau dạ dày'},
          time: '09:00',
          amount: '2 - 4 viên',
          more: 'Sau ăn',
        },
        {
          title: 'Đi khám dạ dày',
          type: EventType.VISITED,
          locale: 'BV Bạch Mai',
          more: 'mang theo BHXH',
          time: '10:00',
        },
        {
          title: 'Panadon',
          type: EventType.MEDICINE,
          visited: {title: 'Đau dạ dày'},
          time: '19:00',
          amount: '2 - 4 viên',
          more: 'Trước ăn',
        },
      ],
    },
    {
      date: new Date('2021-12-22T06:23:21.318Z'),
      event: [
        {
          title: 'Panadon',
          type: EventType.MEDICINE,
          visited: {title: 'Đau dạ dày'},
          time: '09:00',
          amount: '2 - 4 viên',
          more: 'Sau ăn',
        },
        {
          title: 'Đi khám dạ dày',
          type: EventType.VISITED,
          locale: 'BV Bạch Mai',
          more: 'mang theo BHXH',
          time: '10:00',
        },
      ],
    },
    {
      date: new Date('2021-12-25T06:23:21.318Z'),
      event: [
        {
          title: 'Panadon',
          type: EventType.MEDICINE,
          visited: {title: 'Đau dạ dày'},
          time: '09:00',
          amount: '2 - 4 viên',
          more: 'Sau ăn',
        },
        {
          title: 'Đi khám dạ dày',
          type: EventType.VISITED,
          locale: 'BV Bạch Mai',
          more: 'mang theo BHXH',
          time: '10:00',
        },
      ],
    },
    {
      date: new Date('2021-12-26T06:23:21.318Z'),
      event: [
        {
          title: 'Panadon',
          type: EventType.MEDICINE,
          visited: {title: 'Đau dạ dày'},
          time: '09:00',
          amount: '2 - 4 viên',
          more: 'Sau ăn',
        },
        {
          title: 'Đi khám dạ dày',
          type: EventType.VISITED,
          locale: 'BV Bạch Mai',
          more: 'mang theo BHXH',
          time: '10:00',
        },
      ],
    },
    {
      date: new Date('2021-12-27T06:23:21.318Z'),
      event: [
        {
          title: 'Panadon',
          type: EventType.MEDICINE,
          visited: {title: 'Đau dạ dày'},
          time: '09:00',
          amount: '2 - 4 viên',
          more: 'Sau ăn',
        },
        {
          title: 'Đi khám dạ dày',
          type: EventType.VISITED,
          locale: 'BV Bạch Mai',
          more: 'mang theo BHXH',
          time: '10:00',
        },
      ],
    },
    {
      date: new Date('2021-12-28T06:23:21.318Z'),
      event: [
        {
          title: 'Panadon',
          type: EventType.MEDICINE,
          visited: {title: 'Đau dạ dày'},
          time: '09:00',
          amount: '2 - 4 viên',
          more: 'Sau ăn',
        },
        {
          title: 'Đi khám dạ dày',
          type: EventType.VISITED,
          locale: 'BV Bạch Mai',
          more: 'mang theo BHXH',
          time: '10:00',
        },
      ],
    },
    {
      date: new Date('2021-12-29T06:23:21.318Z'),
      event: [
        {
          title: 'Panadon',
          type: EventType.MEDICINE,
          visited: {title: 'Đau dạ dày'},
          time: '09:00',
          amount: '2 - 4 viên',
          more: 'Sau ăn',
        },
        {
          title: 'Đi khám dạ dày',
          type: EventType.VISITED,
          locale: 'BV Bạch Mai',
          more: 'mang theo BHXH',
          time: '10:00',
        },
      ],
    },
  ]);

  const gotoSearchScreen = (): void => {
    props?.navigation?.navigate(SCREEN.SEARCH);
  };
  const renderItem = ({item}: any) => <HDayTag data={item} />;

  const showHideExtend = (type: TypeExtend): void => {
    if (extendVisible && type != typeExtend) {
      setTypeExtend(type);
    } else {
      setExtendVisible(!extendVisible);
      setTypeExtend(type);
    }
  };
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
      <ExtendDiary type={typeExtend} visible={extendVisible} />

      {/* chỗ này yêu cầu phải có 1 renderItem nhưng mình dùng CellRendererComponent nên nó báo lỗi
      @ts-ignore */}
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
      <TouchableOpacity
        onPress={() => {
          props.navigation?.navigate(SCREEN.DIARY.VISITED);
          // showAlert(AlertType.FAIL, 'test');
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
{
  /* <Button onPress={async () => {
				showLoading(2000)
				await AsyncStorage.setItem('isJoined', '0', () => {
					console.log('setIsJoined = \'0\'')
				})
				// hideLoading()
			}} title='loading' />
			<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
				<Button title='increment' onPress={() => {
					dispatch(testAction.increment())
				}} />
				<Button title='decrement' onPress={() => {
					dispatch(testAction.decrement())
				}} />
			</View>
			<Text style={{ alignSelf: 'center', fontSize: 30 }}>{count}</Text> */
}

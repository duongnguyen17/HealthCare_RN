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
  HEvent,
  STRINGS,
  TYPE_SHOW,
} from '../../common';
import {ScreenProps} from '../../type/type';
import HHeader from '../../components/HHeader';
import HDayTag from '../../components/HDayTag';
import ExtendDiary, {TypeExtend} from './components/ExtendDiary';
import {showAlert} from '../../components/HAlert';
import {findSomeDay} from '../../utils/dateutils';
import {eventsAction} from '../../reduxSaga/slices/eventsSlice';
import {useIsFocused} from '@react-navigation/native';
import TriangleAnimated from '../../components/TriangleAnimated';
import {navigateTo} from '../../navigator/NavigationServices';

const Diary = () => {
  const allEvent: Array<HEvent> = useSelector(
    (state: RootStateType) => state.eventState.all,
  );
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const list = useRef<any>();
  const [extendVisible, setExtendVisible] = useState<boolean>(false);
  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);
  const [typeExtend, setTypeExtend] = useState<TypeExtend>(TypeExtend.calendar);
  const [data, setData] = useState<Array<HEvent>>([]);
  const [eventType, setEventType] = useState<TYPE_SHOW>(TYPE_SHOW.ALL);

  useEffect(() => {
    isFocused && dispatch(eventsAction.getAllEvent());
  }, [isFocused]);

  useEffect(() => {
    //filter data
    if (eventType == TYPE_SHOW.ALL) {
      setData(allEvent);
    } else {
      let dataTemp: Array<HEvent> = [];
      allEvent.forEach(element => {
        // @ts-ignore
        let arr = element.event.filter(e => e.type == eventType);
        if (arr.length != 0) dataTemp.push({date: element.date, event: arr});
      });
      setData(dataTemp);
    }
  }, [eventType, allEvent]);

  const gotoSearchScreen = (): void => {
    navigateTo(STRINGS.ROUTE.SEARCH);
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
    [extendVisible, typeExtend],
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
  return (
    <View style={styles.container}>
      <HHeader>
        <TouchableOpacity
          style={{paddingHorizontal: 10, paddingVertical: 8}}
          onPress={() => {
            showHideExtend(TypeExtend.option);
          }}>
          <HIcon name="three-bars" font="Octicons" size={30} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
          onPress={() => {
            showHideExtend(TypeExtend.calendar);
            setCalendarVisible(!calendarVisible);
          }}>
          <Text style={{fontSize: FONT_SIZE.CONTENT}}>Tháng 12</Text>
          <TriangleAnimated state={calendarVisible} />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={gotoSearchScreen}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}>
            <HIcon font="Octicons" name="search" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginLeft: 4,
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}
            onPress={() => {
              scrollToSomeDay(new Date());
            }}>
            <HIcon font="Foundation" name="target-two" />
          </TouchableOpacity>
        </View>
      </HHeader>
      <ExtendDiary
        data={allEvent}
        type={typeExtend}
        visible={extendVisible}
        eventType={eventType}
        setEventType={setEventType}
      />
      <View style={{flex: 1}}>
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
            style={{flex: 1}}
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
          navigateTo(STRINGS.ROUTE.DIARY.VISITED);
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

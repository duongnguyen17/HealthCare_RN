import React, {useState, useEffect} from 'react';
import {
  View,
  UIManager,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Image,
  Text,
  FlatList,
} from 'react-native';
import {COLORS, DataRadioList, FONT_SIZE, TYPE_SHOW} from '../../../common';
import { Calendar } from '../../../components/CustomCalendar';
import RadioList from './RadioList';

const ExtendDiary = ({type, visible}: ExtendDiaryProps): JSX.Element => {
  const [s_visible, setS_visible] = useState<boolean>();
  const [account, setAccount] = useState([
    {username: 'duongthptnt@gmail.com'},
    {username: 'duongthptnt@outlook.com'},
  ]);
  const [typeShow, setTypeShow] = useState<DataRadioList>(TYPE_SHOW.all);
  useEffect(() => {
    if (s_visible == undefined) setS_visible(visible);
    else show();
  }, [visible]);

  const show = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        100,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.scaleXY,
      ),
    );
    setS_visible(!s_visible);
  };
  const renderAccountItem = ({item}: any) => {
    return (
      <View style={{marginVertical: 2}}>
        <Text>{item.username}</Text>
      </View>
    );
  };
  return (
    <View
      style={[
        {
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderColor: COLORS.GRAY_DECOR,
        },
        s_visible ? styles.extendShow : styles.extendHide,
      ]}>
      {type == TypeExtend.calendar ? (
        <Calendar style={{width: '100%', height: '100%'}} enableSwipeMonths />
      ) : (
        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
          }}>
          <View style={{marginVertical: 10}}>
            <Text style={{fontSize: FONT_SIZE.TITLE}}>
              Tài khoản đã liên kết
            </Text>
            <FlatList
              style={{marginLeft: 10, marginTop: 5}}
              renderItem={renderAccountItem}
              data={account}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View
            style={[
              s_visible ? {height: 1} : {height: 0},
              {backgroundColor: COLORS.GRAY_DECOR},
            ]}
          />
          <View style={{marginTop: 10}}>
            <Text style={{fontSize: FONT_SIZE.TITLE}}>Nội dung hiển thị</Text>
            <RadioList
              style={{marginLeft: 10, marginTop: 5}}
              data={[
                {title: 'All', value: 1},
                {title: 'Lịch khám', value: 2},
                {title: 'Uống thuốc', value: 3},
              ]}
              selected={typeShow}
              setSelected={setTypeShow}
            />
          </View>
        </View>
      )}
    </View>
  );
};
export default ExtendDiary;

const styles = StyleSheet.create({
  extendShow: {width: '100%', height: '45%'},
  extendHide: {width: '100%', height: 0},
});
interface ExtendDiaryProps {
  type: TypeExtend;
  visible: boolean;
}
export enum TypeExtend {
  option = 'Option',
  calendar = 'Calendar',
}

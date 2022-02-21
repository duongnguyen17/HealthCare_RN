import React, { useEffect, useState } from 'react';
import {
  FlatList, LayoutAnimation, StyleSheet, Text, View
} from 'react-native';
import { COLORS, FONT_SIZE, HEvent, STRINGS, TYPE_SHOW } from '../../../common';
import { Calendar } from '../../../components/CustomCalendar';
import RadioList from './RadioList';

const ExtendDiary = ({
  data,
  type,
  visible,
  eventType,
  setEventType,
}: ExtendDiaryProps): JSX.Element => {
  const [s_visible, setS_visible] = useState<boolean>();
  const [account, setAccount] = useState([
    { username: 'duongthptnt@gmail.com' },
    { username: 'duongthptnt@outlook.com' },
  ]);
  useEffect(() => {
    if (s_visible == undefined) setS_visible(visible);
    else show();
  }, [visible]);

  const show = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.create(
        300,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.scaleXY,
      ),
    );
    setS_visible(!s_visible);
  };
  const renderAccountItem = ({ item }: any) => {
    return (
      <View style={{ marginVertical: 2 }}>
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
        <Calendar markingType='multi-dot' style={{ width: '100%', height: '100%' }} enableSwipeMonths markedDates={{}} />
      ) : (
        <View
          style={{
            flex: 1,
            marginHorizontal: 10,
          }}>
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: FONT_SIZE.TITLE }}>
              {STRINGS.DIARY_TAB.ACCOUNT_HAS_AUTH}
            </Text>
            <FlatList
              style={{ marginLeft: 10, marginTop: 5 }}
              renderItem={renderAccountItem}
              data={account}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <View
            style={[
              s_visible ? { height: 1 } : { height: 0 },
              { backgroundColor: COLORS.GRAY_DECOR },
            ]}
          />
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: FONT_SIZE.TITLE }}>{STRINGS.DIARY_TAB.CONTENT_DISPLAY}</Text>
            <RadioList
              style={{ marginLeft: 10, marginTop: 5 }}
              data={Object.values(TYPE_SHOW)}
              selected={eventType}
              setSelected={setEventType}
            />
          </View>
        </View>
      )}
    </View>
  );
};
export default ExtendDiary;

const styles = StyleSheet.create({
  extendShow: { width: '100%', height: 335 },
  extendHide: { width: '100%', height: 0 },
});
interface ExtendDiaryProps {
  data: Array<HEvent>,
  type: TypeExtend;
  visible: boolean;
  eventType: TYPE_SHOW;
  setEventType: React.Dispatch<React.SetStateAction<TYPE_SHOW>>;
}
export enum TypeExtend {
  option = 'Option',
  calendar = 'Calendar',
}

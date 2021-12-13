import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  Button,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import {hideLoading, showLoading} from '../../components/Loading';
import {useSelector, useDispatch} from 'react-redux';
import {RootStateType} from '../../type/type';
import {testAction} from '../../reduxSaga/slices/testSlice';
import HIcon from '../../components/HIcon';
import {FONT_SIZE} from '../../common';
import {getStatusBarHeight} from '../../utils/IPhoneXHelper';
import LinearGradient from 'react-native-linear-gradient';

const HeaderTab = () => {
  const statusBarHeight = getStatusBarHeight(true);
  return (
    <View
      style={{
        width: '100%',
        height: statusBarHeight + 40,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}>
      <LinearGradient
        style={{
          height: statusBarHeight + 40,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 0,
        }}
        colors={['#e6f2ff', '#ffffff']}
        start={{x: 0.5, y: 0.25}}
        end={{x: 0, y: 0}}
      />
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 5,
          marginTop: statusBarHeight,
          height: 40,
          alignItems: 'center',
          justifyContent: 'space-between',
          //   backgroundColor: 'gray',
        }}>
        <TouchableOpacity>
          <HIcon name="three-bars" font="Octicons" size={30} />
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Text style={{fontSize: FONT_SIZE.CONTENT}}>Tháng 12</Text>
          <HIcon
            font="Octicons"
            name="triangle-down"
            style={{marginLeft: 5}}
            size={16}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity>
            <HIcon font="Octicons" name="search" />
          </TouchableOpacity>
          <TouchableOpacity style={{marginHorizontal: 20}}>
            <HIcon font="FontAwesome5" name="calendar-day" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const Diary = (prop: ViewProps) => {
  // const count = useSelector((state: RootStateType) => state.testState.count)
  // const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <HeaderTab />
      {/* <Button onPress={async () => {
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
			<Text style={{ alignSelf: 'center', fontSize: 30 }}>{count}</Text> */}
    </View>
  );
};

export default Diary;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

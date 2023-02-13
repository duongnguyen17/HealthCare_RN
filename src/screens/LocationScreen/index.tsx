import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONT_SIZE, STRINGS} from '../../common';
import ContainerView from '../../components/ContainerView';
import HButton from '../../components/HButton';
import HeaderCommon from '../../components/HHeader/HHeaderCommon';
import {goBack, routeParam} from '../../navigator/NavigationServices';
import {locationAction} from '../../reduxSaga/slices/locationSlice';
import {medicinesAction} from '../../reduxSaga/slices/medicinesSlice';
import {RootStateType, ScreenProps} from '../../type/type';
import Tag from '../main/DiaryTab/components/Tag';

const LocationScreen = (props: ScreenProps) => {
  const _id = routeParam(props.route, '_id');
  const location = useSelector(
    (state: RootStateType) => state.locationState.location,
  );
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  useEffect(() => {
    dispatch(locationAction.getLocation(_id));
  }, []);

  useEffect(() => {
    //@ts-ignore
    setTitle(location?.name);
  }, [location]);

  const deleteLocation = () => {
    dispatch(locationAction.deleteLocation(_id));
    goBack();
  };
  return (
    <ContainerView>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
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
                Địa điểm khám
              </Text>
            )}
          />
          <View>
            <Tag>
              <Text>{title}</Text>
            </Tag>
          </View>
        </View>
        <HButton
          style={styles.btnSave}
          title="Xóa"
          textStyle={styles.textBtnLogin}
          type={'delete'}
          onPress={deleteLocation}
        />
      </View>
    </ContainerView>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  btnSave: {
    marginVertical: 10,
    marginHorizontal: 40,
  },
  textBtnLogin: {
    fontSize: 16,
  },
});

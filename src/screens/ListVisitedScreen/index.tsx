import {useIsFocused} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, DIMENS, FONT_SIZE, STRINGS} from '../../common';
import ContainerView from '../../components/ContainerView';
import HeaderCommon from '../../components/HHeader/HHeaderCommon';
import HIcon from '../../components/HIcon';
import VisitedTag from '../../components/VisitedTag';
import {useDebounceValue} from '../../customHooks';
import {routeParam} from '../../navigator/NavigationServices';
import {visitedsAction} from '../../reduxSaga/slices/visitedsSlice';
import {RootStateType, ScreenProps} from '../../type/type';

const ListVisitedScreen = (props: ScreenProps) => {
  const listVisited = useSelector(
    (state: RootStateType) => state.visitedState.listVisited,
  );

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const index = useRef<number>(0);
  const onPress = routeParam(props.route, 'onPress');
  const [textInput, setTextInput] = useState('');
  const keyword = useDebounceValue<string>(textInput);

  useEffect(() => {
    isFocused && search(keyword, index.current);
  }, [keyword, isFocused]);

  const renderItem = ({item}: any) => {
    return <VisitedTag data={item} onPressItem={onPress} />;
  };

  const search = (keyword: String, index: number) => {
    dispatch(visitedsAction.searchVisited({keyword, index}));
  };

  const RenderxIcon = useCallback(() => {
    if (textInput != '')
      return (
        <TouchableOpacity
          onPress={() => {
            setTextInput('');
          }}
          style={styles.containerIcon}>
          <HIcon font="Octicons" name="x" size={16} color={COLORS.WHITE} />
        </TouchableOpacity>
      );
    else return null;
  }, [textInput]);

  const RenderList = useCallback(
    () =>
      listVisited.length == 0 ? (
        <Text
          style={{
            color: COLORS.GRAY_TEXT_1,
            fontSize: FONT_SIZE.TITLE,
            alignSelf: 'center',
            marginTop: 50,
          }}>
          {STRINGS.SEARCH_SCREEN.NO_DATA}
        </Text>
      ) : (
        <FlatList data={listVisited} renderItem={renderItem} />
      ),
    [listVisited],
  );

  return (
    <ContainerView>
      <HeaderCommon
        hasLinear
        renderTitle={() => (
          <View style={styles.editTextContainer}>
            <TextInput
              style={{paddingVertical: 0, flex: 1}}
              value={textInput}
              onChangeText={setTextInput}
              placeholder={STRINGS.SEARCH_SCREEN.INPUT_SEARCH_KEY_WORD}
            />
            <View style={styles.containerIconX}>
              <RenderxIcon />
            </View>
          </View>
        )}
      />
      <View style={styles.containerList}>
        <RenderList />
      </View>
    </ContainerView>
  );
};

export default ListVisitedScreen;

const styles = StyleSheet.create({
  editTextContainer: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
    // height: (4 * DIMENS.HEADER_HEIGHT) / 5,
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.GRAY_DECOR,
  },
  containerIconX: {
    borderRadius: 10,
    marginLeft: 10,
    width: 20,
    height: 20,
  },
  containerIcon: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    backgroundColor: COLORS.GRAY_DECOR,
  },
  containerList: {
    flex: 1,
    zIndex: 1,
    marginHorizontal: DIMENS.MARGIN_HORIZONTAL,
  },
  button: {
    marginBottom: 10,
    marginHorizontal: 40,
  },
  textBtnLogin: {
    fontSize: 16,
  },
});

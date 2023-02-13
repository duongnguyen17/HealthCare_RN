import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, DIMENS, FONT_SIZE, SearchType, STRINGS} from '../../common';
import ContainerView from '../../components/ContainerView';
import HDayTag from '../../components/HDayTag';
import HDropDownPicker from '../../components/HDropDownPicker';
import HeaderCommon from '../../components/HHeader/HHeaderCommon';
import HIcon from '../../components/HIcon';
import {useDebounceValue} from '../../customHooks';
import {routeParam} from '../../navigator/NavigationServices';
import {eventsAction} from '../../reduxSaga/slices/eventsSlice';
import {RootStateType, ScreenProps} from '../../type/type';

const DropKey = [
  {key: 'all', value: SearchType.ALL},
  // {key: 'dat', value: SearchType.DATE},
  // {key: 'loc', value: SearchType.LOCATION},
  {key: 'med', value: SearchType.MEDICINE},
  {key: 'vis', value: SearchType.VISITED},
];

const SearchScreen = (props: ScreenProps) => {
  const typeParam = routeParam(props.route, 'type');
  const searchResult = useSelector(
    (state: RootStateType) => state.eventState.searchResult,
  );
  const type = routeParam(props.route, 'type');
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState('');
  const keyword = useDebounceValue<string>(textInput);
  const [searchType, setSearchType] = useState(typeParam ?? SearchType.ALL);
  useEffect(() => {
    search(keyword, searchType);
  }, [keyword, searchType]);
  const renderItem = ({item}: any) => <HDayTag data={item} />;

  const search = (keyword: String, type: SearchType) => {
    dispatch(eventsAction.searchEvent({keyword, searchType: type}));
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

  const RenderList = () =>
    searchResult.length == 0 || textInput == '' ? (
      <Text
        style={{
          color: COLORS.GRAY_TEXT_1,
          fontSize: FONT_SIZE.TITLE,
          alignSelf: 'center',
          marginTop: 50,
        }}>
        {STRINGS.SEARCH_SCREEN.NO_RESULT}
      </Text>
    ) : (
      <FlatList data={searchResult} renderItem={renderItem} />
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
        // renderRight={() => (
        //   <HDropDownPicker
        //     scrollable={false}
        //     data={DropKey}
        //     selected={searchType}
        //     setSelected={setSearchType}
        //   />
        // )}
      />
      <View style={styles.containerList}>
        <RenderList />
      </View>
    </ContainerView>
  );
};
export default SearchScreen;

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
});

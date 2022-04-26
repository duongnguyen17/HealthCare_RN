import React, { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, DIMENS, FONT_SIZE, SearchType, STRINGS } from '../../common';
import ContainerView from '../../components/ContainerView';
import HDayTag from '../../components/HDayTag';
import HDropDownPicker from '../../components/HDropDownPicker';
import HeaderCommon from '../../components/HHeader/HHeaderCommon';
import HIcon from '../../components/HIcon';
import { useDebounceValue } from '../../customHooks';
import { routeParam } from '../../navigator/NavigationServices';
import { eventsAction } from '../../reduxSaga/slices/eventsSlice';
import { RootStateType, ScreenProps } from '../../type/type';
const DropKey = [
  { key: 'all', value: SearchType.ALL },
  // {key: 'dat', value: SearchType.DATE},
  // {key: 'loc', value: SearchType.LOCATION},
  { key: 'med', value: SearchType.MEDICINE },
  { key: 'vis', value: SearchType.VISITED },
];
const SearchScreen = (props: ScreenProps) => {
  const searchResult = useSelector(
    (state: RootStateType) => state.eventState.searchResult,
  );
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState('');
  const keyword = useDebounceValue<string>(textInput);
  const [searchType, setSearchType] = useState(
    routeParam(props.route, 'searchType') != undefined
      ? routeParam(props.route, 'searchType')
      : SearchType.ALL,
  );
  useEffect(() => {
    search(keyword, searchType);
  }, [keyword, searchType]);
  const renderItem = ({ item }: any) => <HDayTag data={item} />;

  const search = (keyword: String, type: SearchType) => {
    dispatch(eventsAction.searchEvent({ keyword, searchType: type }));
  };
  return (
    <ContainerView>
      <HeaderCommon
        hasLinear
        renderTitle={() => (
          <View
            style={{
              borderRadius: 20,
              borderWidth: 1,
              paddingHorizontal: 15,
              alignItems: 'center',
              flexDirection: 'row',
              height: (4 * DIMENS.HEADER_HEIGHT) / 5,
              backgroundColor: COLORS.WHITE,
              borderColor: COLORS.GRAY_DECOR,
            }}>
            <TextInput
              autoFocus
              value={textInput}
              onChangeText={setTextInput}
              placeholder={STRINGS.SEARCH_SCREEN.INPUT_SEARCH_KEY_WORD}
              style={{ width: (DIMENS.SCREEN_WIDTH * 11) / 20 }}
            />
            <View
              style={{
                borderRadius: 10,
                marginLeft: 10,
                width: 20,
                height: 20,
              }}>
              {textInput != '' && (
                <TouchableOpacity
                  onPress={() => {
                    setTextInput('');
                  }}
                  style={{
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 20,
                    height: 20,
                    backgroundColor: COLORS.GRAY_DECOR,
                  }}>
                  <HIcon
                    font="Octicons"
                    name="x"
                    size={16}
                    color={COLORS.WHITE}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        renderRight={() => (
          <HDropDownPicker
            scrollable={false}
            data={DropKey}
            selected={searchType}
            setSelected={setSearchType}
          />
        )}
      />
      <View
        style={{
          flex: 1,
          zIndex: 1,
          marginHorizontal: DIMENS.MARGIN_HORIZONTAL,
        }}>
        {searchResult.length == 0 || textInput == '' ? (
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
        )}
      </View>
    </ContainerView>
  );
};
export default SearchScreen;

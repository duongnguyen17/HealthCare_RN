import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  TextStyle,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  COLORS,
  DIMENS,
  FONT_SIZE,
  HEvent,
  SearchType,
  STRINGS,
  TEXT_STYLES,
} from '../../common';
import HDayTag from '../../components/HDayTag';
import HDropDownPicker from '../../components/HDropDownPicker';
import HeaderCommon from '../../components/HHeader/HHeaderCommon';
import HIcon from '../../components/HIcon';
import {useDebounceValue} from '../../customHooks';
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
  const searchResult = useSelector(
    (state: RootStateType) => state.eventState.searchResult,
  );
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState('');
  const keyword = useDebounceValue<string>(textInput);
  const [searchType, setSearchType] = useState(
    props.route?.params?.searchType != undefined
      ? props.route?.params?.searchType
      : SearchType.ALL,
  );
  useEffect(() => {
    search(keyword, searchType);
  }, [keyword, searchType]);
  const renderItem = ({item}: any) => <HDayTag data={item} />;

  const search = (keyword: String, type: SearchType) => {
    dispatch(eventsAction.searchEvent({keyword, searchType: type}));
  };
  return (
    <View style={{flex: 1}}>
      <HeaderCommon
        hasLinear
        navigation={props.navigation}
        renderTitle={() => (
          <Text style={TEXT_STYLES.HEADER as TextStyle}>{STRINGS.SEARCH}</Text>
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
        <View
          style={{
            marginTop: 8,
            borderRadius: 20,
            borderWidth: 1,
            paddingHorizontal: 15,
            alignItems: 'center',
            flexDirection: 'row',
            height: 40,
            backgroundColor: COLORS.WHITE,
            borderColor: COLORS.GRAY_DECOR,
          }}>
          <TextInput
            autoFocus
            value={textInput}
            onChangeText={setTextInput}
            placeholder={'Nhập từ khoá tìm kiếm'}
            style={{width: (DIMENS.SCREEN_WIDTH * 11) / 20}}
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
        {searchResult.length == 0 || textInput == '' ? (
          <Text
            style={{
              color: COLORS.GRAY_TEXT_1,
              fontSize: FONT_SIZE.TITLE,
              alignSelf: 'center',
              marginTop: 50,
            }}>
            Không tìm thấy kết quả phù hợp
          </Text>
        ) : (
          <FlatList data={searchResult} renderItem={renderItem} />
        )}
      </View>
    </View>
  );
};
export default SearchScreen;

import React, {useState, useEffect} from 'react';
import {View, TextInput, TouchableOpacity, Text, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS, FONT_SIZE, HEvent, SearchType, width} from '../../common';
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
        navigation={props.navigation}
        renderTitle={() => (
          <View
            style={{
              borderRadius: 20,
              borderWidth: 1,
              paddingHorizontal: 15,
              alignItems: 'center',
              flexDirection: 'row',
              height: 40,
              borderColor: COLORS.GRAY_DECOR,
            }}>
            <TextInput
              autoFocus
              value={textInput}
              onChangeText={setTextInput}
              placeholder={'Nhập từ khoá tìm kiếm'}
              style={{width: (width * 11) / 20}}
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
                    backgroundColor: '#bfbfbf',
                  }}>
                  <HIcon font="Octicons" name="x" size={16} color="#fff" />
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
      <View style={{flex: 1, zIndex: 1}}>
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

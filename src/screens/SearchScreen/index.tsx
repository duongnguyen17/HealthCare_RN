import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {COLORS, SearchType, width} from '../../common';
import HeaderCommon from '../../components/HHeader/HHeaderCommon';
import HIcon from '../../components/HIcon';
import {useDebounceValue} from '../../customHooks';
import {ScreenProps} from '../../type/type';
import {getStatusBarHeight} from '../../utils/IPhoneXHelper';

const SearchScreen = ({searchType, navigation}: SearchScreenProps) => {
  const [textInput, setTextInput] = useDebounceValue<string>('');
  return (
    <View style={{flex: 1}}>
      <HeaderCommon
        navigation={navigation}
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
              style={{width: (width * 12) / 20}}
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
      />
    </View>
  );
};
export default SearchScreen;
interface SearchScreenProps extends ScreenProps {
  searchType?: SearchType;
}

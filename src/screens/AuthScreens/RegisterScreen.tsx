import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInput} from 'react-native-paper';
import {STRINGS} from '../../common';
import HButton from '../../components/HButton';
import {ScreenProps} from '../../type/type';
import {COLORS, FONT_SIZE} from '../../common';
import { navigateTo } from '../../navigator/NavigationServices';

const RegisterScreen = ({navigation}: ScreenProps) => {
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [disabled, setDisabled] = useState(false);
  const [isError, setIsError] = useState(false);
  const confirmForgotPassword = () => {
    // if (validatePhone(userPhone))
    navigateTo(STRINGS.ROUTE.AUTH.VERIFY_OTP, {
      phonenumber: phonenumber,
    });
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View
        style={{
          marginHorizontal: 16,
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View style={{marginTop: 52}}>
          <Text style={styles.forgetPass}>
            Nhập số điện thoại để đổi mật khẩu
          </Text>
          <View style={{flex: 1, flexDirection: 'row', marginTop: 25}}>
            {/* <PhoneInput
                            error={checkPhone}
                            onChangeFormattedText={setCode}
                            inputType={true}
                            phone={userPhone}
                            onChangeText={handlePhone}
                        /> */}

            <TextInput
              label={'Số điện thoại'}
              value={phonenumber}
              onChangeText={setPhonenumber}
              mode={'outlined'}
              keyboardType="number-pad"
              style={styles.textInput}
              theme={{colors: {primary: isError ? COLORS.ORANGE : COLORS.LIGHT_BLUE}}}
              onSubmitEditing={confirmForgotPassword}
              autoFocus={true}
            />
          </View>
          <View style={styles.error}>
            {isError && (
              <Text
                style={{fontSize: 16, fontFamily: 'Lato', color: COLORS.ORANGE}}>
                Nhập số điện thoại hợp lệ
              </Text>
            )}
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: COLORS.TEXT_COLOR_BLUR}}>
            Tôi đồng ý với{' '}
            <Text
              onPress={() => {
                // navigate(SCREENS.ACCOUNT.TERMS_OF_SERVICE)
              }}
              style={{color: COLORS.LIGHT_BLUE}}>
              Điều khoản và dịch vụ
            </Text>{' '}
            của Fschool
          </Text>
          <HButton
            style={{marginVertical: 12}}
            title="Tiếp tục"
            textStyle={styles.textLogin}
            type={disabled ? 'disabled' : 'normal'}
            disabled={disabled}
            onPress={confirmForgotPassword}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default RegisterScreen;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  forgetPass: {
    alignSelf: 'center',
    fontSize: FONT_SIZE.CONTENT,
    fontWeight: '200',
  },
  textLogin: {
    fontSize: FONT_SIZE.CONTENT,
    fontWeight: '400',
  },
  textInput: {
    flex: 5,
    fontSize: FONT_SIZE.CONTENT,
  },
  error: {
    marginTop: 7,
  },
});

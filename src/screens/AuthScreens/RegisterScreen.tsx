import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextPropTypes, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { COLORS, DIMENS, FONT_SIZE, STRINGS } from '../../common';
import HairLine from '../../components/HairLine';
import HButton from '../../components/HButton';
import { goBack, replace } from '../../navigator/NavigationServices';
import { authAction } from '../../reduxSaga/slices/authSlice';
import { ScreenProps } from '../../type/type';
import { validatePassword, validatePhone } from '../../utils/validate';

const RegisterScreen = ({ navigation }: ScreenProps) => {
  const dispatch = useDispatch()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [submitCheck, setSubmitCheck] = useState(false);

  useEffect(() => {
    setSubmitCheck(validatePhone(phoneNumber) && validatePassword(password) && checkPassword())
  }, [confirmPassword, password, phoneNumber])

  const checkPassword = (): boolean => {
    return password === confirmPassword
  }

  const onRegist = () => {
    dispatch(authAction.signup({ phoneNumber, password }))
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.text_title_app}>
            Health Care
          </Text>
          <Text style={styles.text_register}>
            Register
          </Text>
          <Text style={styles.text_title_detail}>
            Please enter detail to register
          </Text>
        </View>
        <View style={{ paddingTop: 10, flex: 2 }}>
          <TextInput label='Phone number' keyboardType={'phone-pad'} value={phoneNumber} onChangeText={setPhoneNumber} style={styles.text_input} />
          <TextInput label='Password' value={password} onChangeText={setPassword} style={styles.text_input} />
          <TextInput label='Confirm Password' value={confirmPassword} onChangeText={setConfirmPassword} style={styles.text_input} />
          <HButton
            style={styles.button}
            title="Đăng kí"
            textStyle={styles.text_btn_register}
            type={submitCheck ? 'normal' : 'disabled'}
            disabled={submitCheck ? false : true}
            onPress={onRegist}
          />
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <HairLine style={{ width: '90%' }} />
            <Text style={styles.text_have_acc}>
              Bạn đã có tài khoản?{' '}
              <Text
                style={styles.text_login}
                onPress={() => { goBack() }}>
                Đăng nhập
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default RegisterScreen;
const styles = StyleSheet.create({
  container: {
    height: DIMENS.SCREEN_HEIGHT,
    width: DIMENS.SCREEN_WIDTH,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 10
  },
  text_title_app: {
    color: COLORS.LIGHT_BLUE,
    fontWeight: 'bold',
    fontSize: 42,
  },
  text_register: {
    marginTop: 20,
    color: COLORS.LIGHT_BLUE,
    fontWeight: 'bold',
    fontSize: 26
  },
  text_title_detail: {
    color: COLORS.GRAY_TEXT_2,
    fontSize: FONT_SIZE.TITLE
  },
  text_input: {
    backgroundColor: COLORS.WHITE,
    marginTop: 10
  },
  text_login: {
    fontSize: FONT_SIZE.CONTENT,
    fontWeight: 'bold',
    color: COLORS.BLUE,
  },
  button: {
    marginTop: 50,
    marginHorizontal: 40
  },
  text_btn_register: {
    fontSize: 16,
  },
  text_have_acc: {
    fontSize: FONT_SIZE.CONTENT,
    marginTop: 8,
    color: COLORS.BLACK,
  },
})
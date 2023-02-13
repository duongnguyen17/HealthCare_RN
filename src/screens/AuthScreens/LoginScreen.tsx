import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { TextInput } from 'react-native-paper';

import { ScreenProps } from '../../type/type';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { COLORS, DIMENS, FONT_SIZE, STRINGS } from '../../common';
import HButton from '../../components/HButton';
import Frame from '../../components/Frame';
import { navigateTo } from '../../navigator/NavigationServices';
import LinearGradient from 'react-native-linear-gradient';
import { validatePhone, validatePassword } from '../../utils/validate'
import { useDispatch } from 'react-redux';
import { authAction } from '../../reduxSaga/slices/authSlice';
import HairLine from '../../components/HairLine';


const LoginScreen = ({ navigation }: ScreenProps) => {
  const passInputRef = useRef()
  const dispatch = useDispatch()

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [submitCheck, setSubmitCheck] = useState(false);
  
  const onLogin = () => {
    dispatch(authAction.login({ phoneNumber: phoneNumber, password: password, type: 'phone' }))
  };

  useEffect(() => {
    setSubmitCheck(validatePhone(phoneNumber) && validatePassword(password))
  }, [
    phoneNumber, password
  ])

  const showHidePass = () => {
    setIsShowPassword(!isShowPassword)
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={styles.text_title_app}>
            Health Care
          </Text>
          <Text style={styles.text_login}>
            Login
          </Text>
          <Text style={styles.text_title_detail}>
            Please enter detail to login
          </Text>
        </View>
        <View style={{ paddingTop: 10, flex: 2 }}>
          <TextInput label='Phone number' value={phoneNumber} onChangeText={setPhoneNumber} style={styles.text_input} keyboardType={'phone-pad'} onEndEditing={() => { passInputRef.current.focus() }} />
          <TextInput onChangeText={setPassword} secureTextEntry={!isShowPassword} ref={passInputRef} label='Password' value={password} onChangeText={setPassword} style={styles.text_input} right={<TextInput.Icon name={isShowPassword ? "eye-off" : "eye"} onPress={showHidePass} />} />
          <HButton
            style={styles.button}
            title="Đăng nhập"
            textStyle={styles.text_btn_login}
            type={submitCheck ? 'normal' : 'disabled'}
            disabled={submitCheck ? false : true}
            onPress={onLogin}

          />
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <HairLine style={{ width: '90%' }} />
            <Text style={styles.text_have_acc}>
              Bạn chưa có tài khoản?{' '}
              <Text
                style={styles.text_regist}
                onPress={() => { navigateTo(STRINGS.ROUTE.AUTH.REGISTER) }}>
                Đăng kí
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

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
  text_login: {
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
  text_regist: {
    fontSize: FONT_SIZE.CONTENT,
    fontWeight: 'bold',
    color: COLORS.BLUE,
  },
  button: {
    marginTop: 50,
    marginHorizontal: 40
  },
  text_btn_login: {
    fontSize: 16,
  },
  text_have_acc: {
    fontSize: FONT_SIZE.CONTENT,
    marginTop: 8,
    color: COLORS.BLACK,
  },
})

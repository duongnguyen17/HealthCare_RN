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



const LoginScreen = ({ navigation }: ScreenProps) => {

  const dispatch = useDispatch()

  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [submitCheck, setSubmitCheck] = useState(false);
  const disableSave = phoneNumber === '' || password === '';
  const passwordRef = useRef<any>(null);

  const onLogin = () => {
    dispatch(authAction.login({ phoneNumber: phoneNumber, password: password, type: 'phone' }))
  };

  useEffect(() => {
    setSubmitCheck(validatePhone(phoneNumber) && validatePassword(password))
  }, [
    phoneNumber, password
  ])

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <LinearGradient
        style={{
          height: DIMENS.SCREEN_HEIGHT,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 0,
        }}
        colors={[COLORS.LIGHT_BLUE, '#e6f2ff', '#ffffff']}
        start={{ x: 0.5, y: 0.25 }}
        end={{ x: 0, y: 1.0 }}
      />
      <View style={styles.container}>
        <View style={styles.logoView}>
          <Text>Logo, slogan</Text>
        </View>
        <Frame style={styles.contentView}>
          <View style={styles.backgroundMain}>
            {/* <Text style={styles.login}>Đăng nhập</Text> */}
            {/* @ts-ignore */}
            <TextInput
              label="Số điện thoại của bạn"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              mode="outlined"
              keyboardType='phone-pad'
              style={styles.phoneInput}
            />
            {/* @ts-ignore */}
            <TextInput
              label="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              secureTextEntry={isShowPassword}
              right={
                <TextInput.Icon
                  name={isShowPassword ? 'eye-off' : 'eye'}
                  onPress={() => setIsShowPassword(!isShowPassword)}
                />
              }
              style={styles.inputPassword}
            />
            <Text
              style={styles.forgetPass}
              onPress={() => navigateTo(STRINGS.ROUTE.AUTH.FORGOT_PASSWORD)}>
              Quên mật khẩu?
            </Text>
            <HButton
              style={{ marginHorizontal: 40 }}
              title="Đăng nhập"
              textStyle={styles.textLogin}
              type={!disableSave && submitCheck ? 'normal' : 'disabled'}
              disabled={!disableSave && submitCheck ? false : true}
              onPress={onLogin}
            />
            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-around', flexDirection: "row" }}>
              <View style={styles.divider} />
              <Text style={styles.or}>hoặc</Text>
              <View style={styles.divider} />

            </View>
            <View style={styles.thirdloginView}>
              {/* <TouchableOpacity onPress={() => { }}>
                <Image
                  source={require('../../../assets/images/facebook_icon.png')}
                  style={styles.logoIcon}
                />
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => { }}>
                <Image
                  source={require('../../../assets/images/google_icon.png')}
                  style={styles.logoIcon}
                />
              </TouchableOpacity>
              {/* {Platform.OS === 'ios' && (
                <TouchableOpacity onPress={() => { }}>
                  <Image
                    source={require('../../../assets/images/apple_icon.png')}
                    style={styles.logoIcon}
                  />
                </TouchableOpacity>
              )} */}
              {/* <TouchableOpacity onPress={() => { }}>
                <Image
                  source={require('../../../assets/images/zalo_icon.png')}
                  style={styles.logoIcon}
                />
              </TouchableOpacity> */}
            </View>
          </View>
        </Frame>
        <View style={{ position: 'absolute', bottom: 4 }}>
          <View style={styles.line} />
          <Text style={styles.noAccText}>
            Bạn chưa có tài khoản?{' '}
            <Text
              style={styles.signUpText}
              onPress={() => navigateTo(STRINGS.ROUTE.AUTH.REGISTER)}>
              Đăng ký
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  logoView: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 100,
    marginTop: '16%'
  },
  contentView: {
    marginHorizontal: 60,
    height: 400,
  },
  backgroundMain: {
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // borderRadius: 8,
    // paddingTop: 23,
    // paddingBottom: 12,
    // paddingHorizontal: 15,
    // overflow: 'hidden',
  },
  login: {
    color: COLORS.PRIMARY_COLOR,
    fontSize: 24,
  },
  forgetPass: {
    alignSelf: 'flex-end',
    marginEnd: 40,
    paddingTop: 10,
    paddingBottom: 16,
    color: COLORS.PRIMARY_COLOR,
    fontSize: 14,
  },
  textLogin: {
    fontSize: 16,
  },
  or: {
    marginTop: 21,
    marginBottom: 16,
    color: '#ACACAC',
    fontSize: 14,
    paddingHorizontal: 8,
  },
  thirdloginView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 28,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.BLACK,
    marginTop: 32,
    marginBottom: 9,
  },
  noAccText: {
    fontSize: 14,
    color: COLORS.BLACK,
  },
  signUpText: {
    color: COLORS.PRIMARY_COLOR,
  },
  desText: {
    textAlign: 'center',
    fontSize: FONT_SIZE.TINY,
    color: COLORS.TEXT_COLOR_SEMI_BLUR,
    position: 'absolute',
    bottom: 30,
  },
  serviceText: {
    color: COLORS.TEXT_COLOR_BLUE,
    fontStyle: 'italic',
    fontWeight: '700',
    textDecorationLine: 'underline',
    fontSize: FONT_SIZE.TINY,
  },
  logoIcon: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  bg1: {
    position: 'absolute',
  },
  divider: {
    width: '30%',
    borderTopColor: COLORS.GRAY_TEXT_2,
    borderTopWidth: 0.5,
  },
  phoneInput: {
    marginTop: 24,
    paddingHorizontal: 25,
  },
  inputPassword: {
    marginTop: 24,
    paddingHorizontal: 25,
  },
  textWrapper: {
    position: 'absolute',
    bottom: -30,
    left: 32,
  },
  text: {
    fontSize: 12,
  },
});

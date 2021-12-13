import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {TextInput} from 'react-native-paper';

import {ScreenProps} from '../../type/type';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {COLORS, FONT_SIZE, SCREEN} from '../../common';
import HButton from '../../components/HButton';
import Frame from '../../components/Frame';

const LoginScreen = ({navigation}: ScreenProps) => {
  const [phonenumber, setPhonenumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [submitCheck, setSubmitCheck] = useState(false);
  const disableSave = phonenumber === '' || password === '';
  const passwordRef = useRef<any>(null);
  const onLogin = () => {};
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={styles.logoView}>
          <Text>Logo, slogan</Text>
        </View>
        <Frame style={styles.contentView}>
          <View style={styles.backgroundMain}>
            {/* <Text style={styles.login}>Đăng nhập</Text> */}

            <TextInput
              label="Số điện thoại của bạn"
              value={phonenumber}
              onChangeText={setPhonenumber}
              mode="outlined"
              style={styles.phoneInput}
            />

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
              onPress={() => navigation.navigate(SCREEN.AUTH.FORGOT_PASSWORD)}>
              Quên mật khẩu?
            </Text>
            <HButton
              title="Đăng nhập"
              textStyle={styles.textLogin}
              type={!disableSave && submitCheck ? 'normal' : 'disabled'}
              disabled={!disableSave && submitCheck ? false : true}
              onPress={onLogin}
            />
            <View style={{width: '100%', alignItems: 'center'}}>
              <View style={styles.divider}></View>
              <Text style={styles.or}>hoặc</Text>
            </View>
            <View style={styles.thirdloginView}>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  source={require('../../../assets/images/facebook_icon.png')}
                  style={styles.logoIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  source={require('../../../assets/images/google_icon.png')}
                  style={styles.logoIcon}
                />
              </TouchableOpacity>
              {Platform.OS === 'ios' && (
                <TouchableOpacity onPress={() => {}}>
                  <Image
                    source={require('../../../assets/images/apple_icon.png')}
                    style={styles.logoIcon}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => {}}>
                <Image
                  source={require('../../../assets/images/zalo_icon.png')}
                  style={styles.logoIcon}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.line} />
            <Text style={styles.noAccText}>
              Bạn chưa có tài khoản?{' '}
              <Text
                style={styles.signUpText}
                onPress={() => navigation.navigate(SCREEN.AUTH.REGISTER)}>
                Đăng ký
              </Text>
            </Text>
          </View>
        </Frame>
      </View>
    </KeyboardAwareScrollView>

    // <SafeAreaView style={styles.container}>
    //   <View style={styles.logoContainer}>
    //     <View style={styles.logo}>
    //       <Text>Logo, slogan</Text>
    //     </View>
    //   </View>
    //   <View style={styles.form}>
    //     <TextInput
    //       mode={'outlined'}
    //       keyboardType={'phone-pad'}
    //       label="Phonenumber"
    //       value={phonenumber}
    //       onChangeText={text => {
    //         setPhonenumber(text);
    //       }}
    //     />
    //     <TextInput
    //       mode={'outlined'}
    //       label="Password"
    //       value={password}
    //       secureTextEntry={isShowPassword}
    //       onChangeText={text => {
    //         setPassword(text);
    //       }}
    //       right={
    //         <TextInput.Icon
    //           name={isShowPassword ? 'eye-outline' : 'eye-off-outline'}
    //           onPress={() => {
    //             setIsShowPassword(!isShowPassword);
    //           }}
    //         />
    //       }
    //     />
    //   </View>
    //   <Button
    //     title="Login"
    //     color="blue"
    //     onPress={() => {
    //       console.log(`phone, pass:`, phonenumber, password);
    //     }}
    //   />
    //   <View style={styles.thirdPartyLoginContainer}>
    //     <TouchableOpacity style={styles.thirdPartyLogin}>
    //       <View style={styles.logoThirPart} />
    //     </TouchableOpacity>
    //     <TouchableOpacity>
    //       <View style={styles.logoThirPart} />
    //     </TouchableOpacity>
    //   </View>
    //   <View style={styles.footer}>
    //     <Text>
    //       Have no account?{' '}
    //       <Text
    //         style={{color: 'blue'}}
    //         onPress={() => {
    //           navigation.navigate(SCREEN.AUTH.REGISTER);
    //         }}>
    //         Signup
    //       </Text>
    //     </Text>
    //   </View>
    // </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    flex: 2,
    alignItems: 'center',
    marginHorizontal: 16,
  },

  logoView: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 100,
  },
  contentView: {
    marginHorizontal: 30,
    height: '60%',
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
    backgroundColor: '#fff',
    paddingHorizontal: 8,
  },
  thirdloginView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 28,
  },
  line: {
    width: '150%',
    height: 0.5,
    backgroundColor: '#ACACAC',
    marginTop: 32,
    marginBottom: 9,
  },
  noAccText: {
    fontSize: 14,
    color: '#5F6368',
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
    width: '100%',
    borderTopColor: '#ACACAC',
    borderTopWidth: 0.5,
    position: 'absolute',
    top: 30,
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

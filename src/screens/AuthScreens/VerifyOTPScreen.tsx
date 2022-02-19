import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HButton from '../../components/HButton';
import {ScreenProps} from '../../type/type';
import {FONT_SIZE, COLORS, STRINGS, DIMENS} from '../../common';
import {navigateTo, routeParam} from '../../navigator/NavigationServices';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
} from 'react-native-confirmation-code-field';
const CELL_COUNT = 6;
const VerifyOTPScreen = ({navigation, route}: ScreenProps) => {
  const phonenumber = routeParam(route, 'phonenumber');
  const [disable, setDisable] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [counter, setCounter] = useState<number>(60);
  const [resend, setResend] = useState<boolean>(true);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [codeProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  useEffect(() => {
    resendSMS();
    setCounter(60);
  }, [resend]);
  useEffect(() => {
    let timeID: any;
    if (counter >= 0) timeID = setTimeout(() => setCounter(counter - 1), 1000);
    return () => {
      clearTimeout(timeID);
    };
  }, [counter]);

  const confirmCode = () => {
    navigateTo(STRINGS.ROUTE.AUTH.REGISTER_FINISH);
  };
  const resendSMS = () => {};
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
        <View style={{alignItems: 'center', marginTop: 52}}>
          <Text style={styles.contentText}>
            Mã xác minh đã được gửi về số điện thoại
          </Text>
          <Text style={[styles.contentText, {fontWeight: 'bold'}]}>
            {phonenumber}
          </Text>
          <View style={{alignItems: 'center'}}>
            <CodeField
              ref={ref}
              {...codeProps}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoFocus={true}
              onBlur={() => {
                value.length === CELL_COUNT && setDisable(false);
              }}
              renderCell={({index, symbol, isFocused}) => (
                <View
                  // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                  onLayout={getCellOnLayoutHandler(index)}
                  key={index}
                  style={[styles.cellRoot, isFocused && styles.focusCell]}>
                  <Text style={styles.cellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
            <View style={{marginTop: 10}}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          </View>
          <View>
            {counter < 0 ? (
              <Text style={styles.waitText}>
                Không nhận được mã xác minh?{' '}
                <Text
                  style={{color: COLORS.TEXT_COLOR_BLUE}}
                  onPress={() => {
                    setResend(!resend);
                  }}>
                  Gửi lại
                </Text>
              </Text>
            ) : (
              <Text style={styles.waitText}>
                Mã xác minh sẽ được gửi lại sau{' '}
                <Text style={{color: COLORS.TEXT_COLOR_BLUE}}>{counter}</Text>{' '}
                giây
              </Text>
            )}
          </View>
        </View>
        <HButton
          style={styles.continueButton}
          title="Tiếp tục"
          disabled={disable}
          textStyle={styles.textLogin}
          type={disable ? 'disabled' : 'normal'}
          onPress={() => confirmCode()}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
export default VerifyOTPScreen;
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  continueButton: {
    marginVertical: 12,
  },
  textLogin: {
    fontSize: FONT_SIZE.CONTENT,
    fontWeight: 'bold',
  },
  contentText: {
    fontSize: FONT_SIZE.CONTENT,
    fontWeight: '200',
  },
  codeFieldRoot: {
    marginTop: 30,
    width: DIMENS.SCREEN_WIDTH - 80,
  },
  cellRoot: {
    width: (DIMENS.SCREEN_WIDTH - 120) / 6,
    height: (DIMENS.SCREEN_WIDTH - 120) / 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: COLORS.BORDER_BOTTOM_COLOR,
    borderBottomWidth: 2,
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },
  cellText: {
    color: '#000',
    fontSize: 36,
    textAlign: 'center',
  },
  waitText: {
    paddingTop: 30,
    fontSize: FONT_SIZE.TINY,
  },
  errorText: {
    color: COLORS.ERROR_COLOR,
    fontSize: FONT_SIZE.TINY,
  },
});

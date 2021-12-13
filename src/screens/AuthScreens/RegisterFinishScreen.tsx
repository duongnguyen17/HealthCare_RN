import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {ScreenProps} from '../../type/type';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextInput} from 'react-native-paper';
import {FONT_SIZE} from '../../common';
import HButton from '../../components/HButton';
const RegisterFinishScreen = (props: ScreenProps) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [invisible, setInvisible] = useState<boolean>(true);
  const [disable, setDisable] = useState<boolean>(true);
  const onSubmit = () => {};
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={styles.contentView}>
        <View style={{marginTop: 52, width: '100%'}}>
          <View
            style={{
              width: '50%',
              height: 100,
              backgroundColor: 'gray',
              alignSelf: 'center',
              marginVertical: 50,
            }}>
            <Text style={styles.textContent}>Logo, slogan</Text>
          </View>
          <TextInput
            label={'Tên của bạn'}
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            style={styles.textInput}
          />
          <TextInput
            label={'Mật khẩu'}
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry={invisible}
            right={
              <TextInput.Icon
                name={invisible ? 'eye-off' : 'eye'}
                onPress={() => setInvisible(!invisible)}
              />
            }
            style={styles.textInput}
          />
          {/* <FCheckPassword
            value={password}
            checkPassword={(bool: boolean) => {
              setdisableSave(!bool);
            }}
            viewContainer={{width: '100%', marginTop: 14}}
          /> */}
        </View>
        <HButton
          style={{paddingVertical: 15, marginTop: 40}}
          title="Hoàn tất"
          textStyle={styles.textLogin}
          onPress={onSubmit}
          type={disable ? 'disabled' : 'normal'}
          disabled={disable}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegisterFinishScreen;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  contentView: {
    justifyContent: 'space-between',
    flex: 2,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  textContent: {
    alignSelf: 'center',
    fontSize: FONT_SIZE.CONTENT,
    fontWeight: '200',
  },
  textInput: {fontSize: FONT_SIZE.CONTENT, marginTop: 25},
  textLogin: {
    fontSize: FONT_SIZE.CONTENT,
    fontWeight: '400',
  },
});

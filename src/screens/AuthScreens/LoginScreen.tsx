import React, { useState } from "react";
import { ViewProps, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SCREEN_NAME } from "../../common";
import { ScreenProps } from "../../type/type";


const LoginScreen = ({ navigation }: ScreenProps) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logo} />
      </View>
      <View style={styles.form}>
        <TextInput
          mode={'outlined'}
          keyboardType={"phone-pad"}
          label="Phonenumber"
          value={email}
          onChangeText={(text) => { setEmail(text) }} />
        <TextInput
          mode={'outlined'}
          label="Password"
          value={password}
          secureTextEntry={isShowPassword}
          onChangeText={(text) => { setPassword(text) }}
          right={<TextInput.Icon name={isShowPassword ? "eye-outline" : "eye-off-outline"} onPress={() => {
            setIsShowPassword(!isShowPassword)
          }} />
          }
        />
      </View>
      <View style={styles.thirdPartyLoginContainer}>
        <TouchableOpacity style={styles.thirdPartyLogin}>
          <View style={styles.logoThirPart} />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.logoThirPart} />
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text>Have no account? <Text style={{ color: 'blue' }} onPress={() => {
          navigation.navigate(SCREEN_NAME.REGISTER)
        }}>Signup</Text></Text>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  logoContainer: {

  },
  logo: {
    backgroundColor: 'gray',
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  form: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  thirdPartyLoginContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 20,
  },
  thirdPartyLogin: {
    marginHorizontal: 20
  },
  logoThirPart: {
    backgroundColor: 'gray',
    width: 50,
    height: 50,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
})
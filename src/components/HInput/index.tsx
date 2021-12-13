import React from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import {HInputProps} from '../../type/type';
const HInput = ({
  styleLable,
  txtLable,
  styleTextInput,
  viewContainer,
  icon,
  lable,
  onChangeText,
  keyboardType,
  placeholder,
  isPassword,
}: HInputProps) => {
  return (
    <View style={[styles.viewContainer, {...viewContainer}]}>
      {lable ? (
        <View style={[styles.lable, {...styleLable}]}>
          <Text style={{...txtLable}}>{lable}</Text>
        </View>
      ) : null}
      <View style={styles.wrapTextInput}>
        <TextInput
          style={[styles.txtInput, {...styleTextInput}]}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor="#8A8886"
          secureTextEntry={isPassword}
        />
        {icon}
      </View>
    </View>
  );
};

export default HInput;
const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  lable: {
    top: 6,
    backgroundColor: 'white',
    left: 10,
    zIndex: 1,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
  },
  txtInput: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  viewContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  wrapTextInput: {
    borderColor: 'blue',
    borderRadius: 8,
    borderWidth: 1,
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

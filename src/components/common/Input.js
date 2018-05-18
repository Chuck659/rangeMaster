import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

const Input = ({ label, onChangeText, value, placeholder, type }) => {
  let keyboard = 'default';
  let secure = false;
  switch (type) {
    case 'password':
      secure = true;
      break;
    case 'email':
      keyboard = 'email-address';
      break;
  }
  labelElement =
    label.length == 0 ? (
      <View />
    ) : (
      <Text style={styles.labelStyle}>{label}</Text>
    );
  return (
    <View style={styles.containerStyle}>
      {labelElement}
      <TextInput
        placeholder={placeholder}
        style={styles.inputStyle}
        value={value}
        onChangeText={onChangeText}
        underlineColorAndroid="transparent"
        secureTextEntry={secure}
        keyboardType={keyboard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  }
});

export { Input };

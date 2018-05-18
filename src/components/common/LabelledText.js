import React, { Component } from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

const LabelledText = ({ label, text }) => {
  labelElement =
    label.length == 0 ? (
      <View />
    ) : (
      <Text style={styles.labelStyle}>{label}</Text>
    );
  return (
    <View style={styles.containerStyle}>
      {labelElement}
      <Text style={styles.textStyle}>{text}</Text>
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
  textStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  }
});

export { LabelledText };

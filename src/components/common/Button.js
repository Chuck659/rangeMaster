import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({
  children,
  onPress,
  onLongPress,
  delayLongPress = 1000,
  disabled
}) => {
  return (
    <TouchableOpacity
      delayLongPress={delayLongPress}
      onPress={onPress}
      onLongPress={onLongPress}
      style={!disabled ? styles.buttonStyle : styles.disabledStyle}
      disabled={disabled}
    >
      <Text style={styles.textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#2196F3',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  disabledStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#161616',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
};

export { Button };

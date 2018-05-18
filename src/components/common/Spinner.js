import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

const Spinner = ({ size, style }) => {
return (
  <View style={Object.assign({}, StyleSheet.flatten(styles.spinnerStyle), style)}>
    <ActivityIndicator size={ size || 'large'} />
  </View> )
}

const styles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export { Spinner };
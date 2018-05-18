import React from 'react'
import { Text, View } from 'react-native'

const Header = ({ children }) => {
  const { textStyle, viewStyle } = styles

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{children}</Text>
    </View>
  )
}

const styles = {
  viewStyle: {
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0, height: 2
    },
    shadowOpacity: 0.6,
    elevation: 5,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20
  }
}

export { Header }

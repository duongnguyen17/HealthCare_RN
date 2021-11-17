import React from 'react';
import { ViewProps, View, StyleSheet } from 'react-native'

const HairLine = (props: ViewProps) => {
  return (
    <View style={[{ height: StyleSheet.hairlineWidth, backgroundColor: '#e6e6e6' }, props.style]} />
  )
}

export default HairLine
import React from "react";
import { Image, Text, View } from 'react-native'
import Frame, { FrameProps } from ".";

export default (props: CardIndexProps) => {
  return (
    <Frame onPress={props.onPress} style={props.style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', marginVertical: 10 }}>
        <View style={{ marginLeft: 10, minHeight: 30, minWidth: 30, backgroundColor: 'gray' }}>
          {props.imageHeaderPath ? <Image source={{ uri: props.imageHeaderPath }} style={{ width: 50, height: 50 }} /> : null}
        </View>
        <View style={{ marginLeft: 5 }}>
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{props.title}</Text>
          <Text style={{ fontSize: 12 }}>{props.measurementTime}</Text>
        </View>
      </View>
      {props.children}
    </Frame>
  )
}

export interface CardIndexProps extends FrameProps {
  imageHeaderPath?: string,
  title: string,
  measurementTime?: string,
}
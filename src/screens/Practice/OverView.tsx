import React, { useRef, useState } from "react";
import { Text, ViewProps, View, StyleSheet, ScrollView, Animated, RefreshControl } from "react-native";
import Frame from "../../components/Frame";

const OverView = ({ scrollY }: TabViewProps) => {
  const [isReFresh, setIsReFresh] = useState(false)
  const onRefresh = () => {
    setIsReFresh(true)
    setTimeout(() => {
      setIsReFresh(false)
    }, 1000);

  }
  return (
    <View style={styles.container}>
      <Animated.ScrollView onScroll={Animated.event(
        // scrollX = e.nativeEvent.contentOffset.x
        [{
          nativeEvent: {
            contentOffset: {
              y: scrollY,
            }
          }
        }],
        { useNativeDriver: false }
      )}
        scrollEventThrottle={2}
        refreshControl={<RefreshControl refreshing={isReFresh} onRefresh={onRefresh} />}
      >
        <Frame >
          <View style={styles.frame}><Text>Chỗ này hiện 1 thông tin này</Text></View>
        </Frame>
        <Frame style={{ marginTop: 20 }}>
          <View style={styles.frame}><Text>Chỗ này hiện 1 thông tin này</Text></View>
        </Frame>
        <Frame style={{ marginTop: 20 }}>
          <View style={styles.frame}><Text>Chỗ này hiện 1 thông tin này</Text></View>
        </Frame>
        <Frame style={{ marginTop: 20 }}>
          <View style={styles.frame}><Text>Chỗ này hiện 1 thông tin này</Text></View>
        </Frame>
      </Animated.ScrollView>
    </View>
  )
}

export default OverView
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  frame: {
    height: 200,
    marginVertical: 10
  }
})

export interface TabViewProps extends ViewProps {
  scrollY: Animated.Value
}
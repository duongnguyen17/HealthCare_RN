import React, { useRef, useState } from "react";
import { Text, ViewProps, View, StyleSheet, ScrollView, Animated, RefreshControl, TouchableOpacity } from "react-native";
import Frame from "../../components/Frame";
import HairLine from "../../components/HairLine";


const OverView = ({ scrollY, navigation }: TabViewProps) => {
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
        <Frame style={styles.frame} >
          <View style={{ marginVertical: 16, width: '100%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 10 }}>
              <View style={{ flexDirection: 'column' }}>
                <Text style={styles.textTarget}>60</Text>
                <Text>còn 1940 bước để hoàn thành mục tiêu</Text>
              </View>
              <View style={{ width: 50, height: 50, backgroundColor: 'gray' }} />
            </View>
          </View>
          <HairLine style={{ width: '100%' }} />
          <View style={{ marginVertical: 10 }}>
            <Text>Hiện 1 ít chỉ số ở đây</Text>
          </View>
          <HairLine style={{ width: '60%' }} />
          <TouchableOpacity style={{ width: '100%', alignItems: 'center' }} onPress={() => {
            navigation.navigate("OverView")
          }}>
            <Text style={{ marginVertical: 16 }}>Xem thêm</Text>
          </TouchableOpacity>
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
    </View >
  )
}

export default OverView
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  frame: {
    marginVertical: 10,
  },
  textTarget: {
    fontSize: 55,
    color: 'orange'
  },
})

export interface TabViewProps extends ViewProps {
  scrollY: Animated.Value,
  navigation: any,
}
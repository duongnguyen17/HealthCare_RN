import React, { useState, useRef } from 'react'
import { Animated, ScrollView, StyleSheet, Text, View, ViewProps } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import OverView from './OverView';
import Jogging from './Jogging';
import { SCREEN_SIZE, TITLE } from '../../common';
import { transform } from '@babel/core';
import Frame from '../../components/Frame';
const renderScene = SceneMap({
	overView: OverView,
	jogging: Jogging,
})
const Practice = (prop: ViewProps) => {
	const scrollY = useRef(new Animated.Value(0)).current
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: 'overView', title: TITLE.OVER_VIEW },
		{ key: 'jogging', title: TITLE.JOGGING },
	]);

	return (
		<View style={styles.container}>
			<LinearGradient style={{
				height: SCREEN_SIZE.height * 2 / 3,
				position: 'absolute',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
				zIndex: 0,
			}}
				colors={["#00aaff", "#66ccff", "#80d4ff", '#fff']}
				start={{ x: 0.5, y: 0.25 }} end={{ x: 0, y: 1.0 }}
			/>
			<Animated.View style={[styles.header,
			{
				height: 150,
				transform: [{
					translateY: scrollY.interpolate({
						inputRange: [0, 150],
						outputRange: [0, -150],
						extrapolate: 'clamp'
					})
				}]
			},]}>
				<Text>Chỗ này thêm gì đó cho đẹp</Text>
			</Animated.View>
			<Animated.View style={{
				marginTop: scrollY.interpolate({
					inputRange: [0, 150],
					outputRange: [150, 0],
					extrapolate: 'clamp'
				}),
				flex: 1,
			}}>
				<TabView
					style={[styles.tabView]}
					renderTabBar={(props) => (
						<TabBar {...props} indicatorStyle={{ backgroundColor: 'white', height: 1, }} style={{
							backgroundColor: 'rgba(217, 217, 217,0)',
							elevation: 0,
						}} />
					)}
					navigationState={{ index, routes }}
					renderScene={({ route }) => {
						switch (route.key) {
							case 'overView':
								return <OverView scrollY={scrollY} />
							default:
								return <Jogging scrollY={scrollY} />
						}
					}}
					onIndexChange={setIndex}
					initialLayout={{ width: SCREEN_SIZE.width }}
				/>
			</Animated.View>
		</View>
	)
}

export default Practice
const styles = StyleSheet.create({
	container: {
		flex: 1,

	},
	header: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
	},
	scrollView: { marginHorizontal: 7 },
	tabView: { height: 0 },
	frame: {
		height: 200,
		marginVertical: 10
	}
})
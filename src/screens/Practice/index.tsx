import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, View, ViewProps } from 'react-native'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import OverView from './OverView';
import Jogging from './Jogging';
import { SCREEN_SIZE, TITLE } from '../../common';

const renderScene = SceneMap({
	overView: OverView,
	jogging: Jogging,
})
const Practice = (prop: ViewProps) => {
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: 'overView', title: TITLE.OVER_VIEW },
		{ key: 'jogging', title: TITLE.JOGGING },
	]);
	return (
		<View style={styles.container}>
			<ScrollView style={styles.scrollView}>
				<View style={styles.header}>
					<Text>Chỗ này để cho đẹp này</Text>
				</View>
				<TabView
					style={styles.tabView}
					renderTabBar={(props) => (<TabBar {...props} indicatorStyle={{ backgroundColor: 'white' }} style={{}} />)}
					navigationState={{ index, routes }}
					renderScene={renderScene}
					onIndexChange={setIndex}
					initialLayout={{ width: SCREEN_SIZE.width }}
				/>
			</ScrollView>
		</View>
	)
}

export default Practice
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#66ccff"
	},
	header: { height: 100, justifyContent: 'center', alignItems: 'center' },
	scrollView: { marginHorizontal: 7 },
	tabView: { height: 200 }
})
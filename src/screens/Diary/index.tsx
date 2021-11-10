import React from 'react'
import { StyleSheet, Text, View, ViewProps } from 'react-native'

const Diary = (prop: ViewProps) => {
	return (
		<View style={styles.container}>
			<Text>Tab nhật kisF</Text>
		</View>
	)
}

export default Diary
const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
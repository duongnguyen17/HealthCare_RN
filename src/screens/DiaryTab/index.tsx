import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Button, StyleSheet, Text, View, ViewProps } from 'react-native'
import { hideLoading, showLoading } from '../../components/Loading'
import { useSelector, useDispatch } from 'react-redux'
import { RootStateType } from '../../type/type'
import { testAction } from '../../reduxSaga/slices/testSlice'
const Diary = (prop: ViewProps) => {
	const count = useSelector((state: RootStateType) => state.testState.count)
	const dispatch = useDispatch()
	return (
		<View style={styles.container}>
			<Button onPress={async () => {
				showLoading(2000)
				// await AsyncStorage.setItem('isJoined', '0', () => {
				// 	console.log('setIsJoined = \'0\'')
				// })
				// hideLoading()
			}} title='loading' />
			<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
				<Button title='increment' onPress={() => {
					dispatch(testAction.increment())
				}} />
				<Button title='decrement' onPress={() => {
					dispatch(testAction.decrement())
				}} />
			</View>
			<Text style={{ alignSelf: 'center', fontSize: 30 }}>{count}</Text>
		</View>
	)
}

export default Diary
const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})
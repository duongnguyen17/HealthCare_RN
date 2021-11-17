import React from 'react'
import { StyleSheet, Text, View, ViewProps } from 'react-native'

const Profile = (prop: ViewProps) => {
    return (
        <View style={styles.container}>
            <Text>Tab thông tin cá nhân</Text>
        </View>
    )
}

export default Profile
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
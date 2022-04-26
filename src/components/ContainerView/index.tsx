import React from 'react'
import { ColorValue, StatusBar } from 'react-native'
import { View } from 'react-native-animatable'
// import HStatusBar from '../HHeader/HStatusBar'

const ContainerView = ({ children, statusBarBackgroundColor }: ContainerViewProps) => (
    <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={statusBarBackgroundColor} />
        {children}
    </View>
)

export default ContainerView
interface ContainerViewProps {
    children: React.ReactNode
    statusBarBackgroundColor?: ColorValue
}
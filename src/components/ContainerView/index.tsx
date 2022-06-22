import React from 'react'
import { ColorValue, StatusBar, StyleProp, ViewStyle } from 'react-native'
import { View } from 'react-native-animatable'
// import HStatusBar from '../HHeader/HStatusBar'

const ContainerView = ({ children, statusBarBackgroundColor, style }: ContainerViewProps) => (
    <View style={[{ flex: 1 }, style]}>
        {children}
    </View>
)

export default ContainerView
interface ContainerViewProps {
    children: React.ReactNode
    statusBarBackgroundColor?: ColorValue,
    style?: StyleProp<ViewStyle>
}
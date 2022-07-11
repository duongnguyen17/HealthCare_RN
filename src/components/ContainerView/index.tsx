import React from 'react'
import { ColorValue, StatusBar, StyleProp, ViewStyle } from 'react-native'
import { View } from 'react-native-animatable'
import { COLORS } from '../../common'
// import HStatusBar from '../HHeader/HStatusBar'

const ContainerView = ({ children, statusBarBackgroundColor, style }: ContainerViewProps) => (
    <View style={[{ flex: 1, backgroundColor: COLORS.WHITE }, style]}>
        {children}
    </View>
)

export default ContainerView
interface ContainerViewProps {
    children: React.ReactNode
    statusBarBackgroundColor?: ColorValue,
    style?: StyleProp<ViewStyle>
}
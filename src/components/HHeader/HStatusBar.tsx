import React, { useState } from "react";
import { ColorValue, StyleProp, View, ViewStyle } from "react-native";
import { COLORS, DIMENS } from "../../common";

const HStatusBar = ({ style }: HStatusBarProps) => {
    return (
        <View
            style={[{
                width: '100%',
                backgroundColor: COLORS.TRANSPARENTS,
                height: DIMENS.STATUS_BAR_HEIGHT
            }, style]} />
    )
}

interface HStatusBarProps {
    style?: StyleProp<ViewStyle>
}

export default HStatusBar
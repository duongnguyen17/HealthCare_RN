import { NavigationProp, RouteProp } from "@react-navigation/core";
import { NavigationContainerRef } from "@react-navigation/native";
import React from "react";
import { Animated, ButtonProps, GestureResponderEvent, PressableProps, TextInputProps, TextStyle, ViewProps, ViewStyle } from "react-native";
import { HEvent, Medicine, Visited } from "../common";

export interface AuthReducerType {
    isLoggIned: boolean,
    isLoading: boolean,
}
export interface UserType { }
export interface AppContextType {
    authState: AuthReducerType,
    userState: UserType,
}
// export interface FrameProps extends ViewProps {

// }
export interface MedicineStateType {
    all: Array<Medicine>
}
export interface VisitedStateType {
    all: Array<Visited>
}
export interface EventStateType {
    all: Array<HEvent>
}
export interface RootStateType {
    medicineState: MedicineStateType,
    visitedState: VisitedStateType,
    eventState: EventStateType
}
export interface ScreenProps extends ViewProps {
    navigation?: NavigationProp<any, any>,
    route?: RouteProp<any>,
}
export interface TabViewProps extends ScreenProps {
    scrollY: Animated.Value,
}

export interface HButtonProps extends PressableProps {
    style?: ViewStyle,
    textStyle?: TextStyle,
    title?: string,
    type?: 'normal' | 'white' | 'disabled' | 'transparent',
    onPress?: null | ((event: GestureResponderEvent) => void),
    disabled?: boolean,
    loading?: boolean,
}

export interface HInputProps {
    styleLable?: ViewStyle,
    txtLable?: TextStyle,
    styleTextInput?: TextInputProps,
    viewContainer?: ViewStyle,
    lable: string,
    icon?: React.ReactNode,
    onChangeText?: ((text: string) => void) | undefined,
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search' | 'visible-password',
    placeholder?: string,
    isPassword?: boolean,
}
export interface NavigationServiceConfig {
    navigator?: NavigationContainerRef<{}>
}


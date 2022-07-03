import { NavigationProp, RouteProp } from "@react-navigation/core";
import { NavigationContainerRef } from "@react-navigation/native";
import React from "react";
import { GestureResponderEvent, PressableProps, TextInputProps, TextStyle, ViewProps, ViewStyle } from "react-native";
import { CalorieResponse, DistanceResponse, HeartRateResponse, SleepSampleResponse, StepsResponse } from "react-native-google-fit";
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
export interface MedicinesStateType {
    all: Array<Medicine>,
    tempMedicine: Medicine | null | undefined,
    tempMedicines: Array<Medicine | undefined | null>
}
export interface VisitedsStateType {
    all: Array<Visited>,
    tempVisited: Visited | null | undefined,
}
export interface EventsStateType {
    all: Array<HEvent>,
    searchResult: Array<HEvent>,
}

export interface SearchStateType {
    searchResult: Array<Medicine | Visited>
}

export interface AuthStateType {
    _id: string,
    isLogin: boolean,
    error: string,
}

export interface UserStateType {
    _id?: string,
    customInfor: CustomInforType
}

export interface CustomInforType {
    username?: string,
    avatar?: string,
    sex?: number,
    dob?: string,
    height?: number,
    weight?: number,
}

export interface DeviceStateType {
    deviceConnecting?: Device | null,
    listDeviceConnected?: Array<Device>,
}

export interface Device {
    id: string,
    name: string,
}
export interface HealthStateType {
    isAuthorized: boolean,
    goalSteps?: number,
    today?: {
        processSteps?: number,
        steps: Array<StepsResponse>,
        sleep: Array<SleepSampleResponse>,
        heartbeat: Array<HeartRateResponse>,
        distances: Array<DistanceResponse>,
        calories: Array<CalorieResponse>,
    },
    overview?: any,
    steps?: StepsResponse,
    sleepAnalysis?: SleepSampleResponse,
    heartbeat?: HeartRateResponse,
    distances?: DistanceResponse,
    calories?: CalorieResponse,
}
export interface RootStateType {
    authState: AuthStateType,
    healthState: HealthStateType,
    medicineState: MedicinesStateType,
    visitedState: VisitedsStateType,
    eventState: EventsStateType,
    userState: UserStateType,
}
export interface ScreenProps extends ViewProps {
    navigation?: NavigationProp<any, any>,
    route?: RouteProp<any>,
    title?: string
}
export interface TabViewProps extends ScreenProps {
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

export interface ApiResponse {
    message?: string,
    code?: number,
    data?: any
}

export interface ProcessResponseType {
    code: number,
    message: string,
    data: any,
}

import { NavigationProp, RouteProp } from "@react-navigation/core";
import { Reducer } from "react";
import { Animated, ViewProps } from "react-native";
import { AnyAction } from "redux";

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
export interface TestStateType {
    count: number
}
export interface RootStateType {
    testState: TestStateType
}
export interface ScreenProps extends ViewProps {
    navigation: NavigationProp<any, any>,
    route?: RouteProp<any>
}
export interface TabViewProps extends ScreenProps {
    scrollY: Animated.Value,
}
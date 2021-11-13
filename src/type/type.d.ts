import { Reducer } from "react";
import { ViewProps } from "react-native";
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
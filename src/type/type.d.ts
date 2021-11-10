import { ViewProps } from "react-native";

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
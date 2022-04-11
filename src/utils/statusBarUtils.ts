import { ColorValue, StatusBar } from "react-native";
/**thay đổi màu của thanh thông báo */
export const setStatusBarBackground = (color: ColorValue) => {
    StatusBar.setBackgroundColor(color)
}

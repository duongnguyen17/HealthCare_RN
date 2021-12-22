import { Dimensions } from "react-native";
export const { height, width } = Dimensions.get('window')
export const TITLE = {
  OVER_VIEW: 'Tổng quan',
  MOVING: 'Di chuyển',
  HEART_BEAT: 'Nhịp tim',
}

export const SCREEN = {
  MAIN_TABS: {
    PRACTICE: 'Practice',
    DIARY: 'Diary',
    PROFILE: 'Profile',
  },
  PRACTICE: { OVERVIEW: 'OverView', },
  DIARY: { MEDICINE: 'Medicine', VISITED: 'Visited' },
  TAB_NAVIGATOR: 'TabNavigator',
  SEARCH: 'Search',
  AUTH: {
    LOGIN: 'Login',
    REGISTER: 'Register',
    FORGOT_PASSWORD: 'ForgotPasswordScreen',
    VERIFY_OTP: 'VerifyOTP',
    REGISTER_FINISH: 'RegisterFinish'
  },
}

export const COLORS = {
  PRIMARY_COLOR: '#F36744',
  BORDER_BOTTOM_COLOR: '#ABABAB',
  PLACEHOLDER_TEXT_COLOR: '#ABABAB',
  TEXT_COLOR_DESCRIPTION: '#5C5C5C',
  TEXT_COLOR_BLUR: '#0005',
  TEXT_COLOR_SEMI_BLUR: '#0008',
  TEXT_COLOR_BLUE: '#128CF9',
  ICON_COLOR: '#ABABAB',
  ERROR_COLOR: '#FB0404',
  ORANGE: '#ffa938',
  GREEN: '#0bb895',
  BLUE: '#047AFF',
  WHITE: '#fff',
  COLOR_LIGHT_BLUE: '#3DBBED',
  GRAY_DECOR: '#cccccc',
  GRAY_TEXT_1: '#cccccc',
  GRAY_TEXT_2: '#999999',

}
export const FONT_SIZE = {
  TINY: 12,
  CONTENT: 14,
  TITLE: 18,
  HEADER: 24,
  BIG_HEADER: 30,
  HEADER_TAG: 16
}
export const ICON_SIZE = {
  HEADER: 23,
}
export const STYLES = {
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  }
}
export enum TYPE_SHOW {
  ALL = 'All',
  MEDICINE = 'Medicine',
  VISITED = 'Visited'
}
export enum SearchType {
  MEDICINE = 'Medicine',
  DATE = 'Date',
  VISITED = 'Visited',
  LOCALE = 'Locale',
}

export enum EventType {

  VISITED = 'Visited',
  MEDICINE = 'Medicine',
}

export enum AlertType {
  SUCCESS = 'success',
  FAIL = 'fail',
  WARN = 'warn',
}
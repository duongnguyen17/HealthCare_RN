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
  TAB_NAVIGATOR: 'TabNavigator',

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
}
export const FONT_SIZE = {
  TINY: 13,
  CONTENT: 16,
  TITLE: 18,
  HEADER: 24,
  BIG_HEADER: 30,
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
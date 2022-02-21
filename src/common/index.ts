import { Dimensions } from "react-native";
import { getStatusBarHeight } from "../utils/IPhoneXHelper";
const { height, width } = Dimensions.get('window')
const statusBarHeight = getStatusBarHeight(true);
export const STRINGS = {
  SEARCH_SCREEN: {
    TITLE: "Tìm kiếm",
    NO_RESULT: "Không tìm thấy kết quả phù hợp",
    INPUT_SEARCH_KEY_WORD: 'Nhập từ khoá tìm kiếm',
  },
  DIARY_TAB: {
    TODAY_HAS_NO_EVENT: 'Hôm nay không có sự kiện nào',
    THIS_MONTH_HAS_NO_EVENT: "Tháng này không có sự kiện nào",
    ACCOUNT_HAS_AUTH: "Tài khoản đã liên kết",
    CONTENT_DISPLAY: "Nội dung hiển thị",
  },
  MEDICINE_SCREEN: {
    DAY: 'ngày',
    WEEK: 'tuần',
    MONTH: 'tháng',
    TIME_REMIND_DO_NOT_DUPLICATE: 'Thời gian nhắc nhở không được trùng nhau',
    DO_NOT_: 'Không được để trống tên thuốc',
    MEDICINE_NAME: "Tên thuốc ...",
    ADD_REMIND: "Thêm nhắc nhở",
    LAST: "Uống trong",
  },
  VISITED_SCREEN: {
    DO_NOT_: 'Không được để trống tên lần khám',
    VISITED_NAME: "Tên lần khám ...",
    LOCATION: "Địa điểm",
    EX_DAY: "Ngày khám",
    ADD_MEDICINE: "Thêm thuốc",
    NOTE: "Ghi chú",
    DO_NOT_HAVE: "Không có",
  },
  TITLE: {
    OVER_VIEW: 'Tổng quan',
    MOVING: 'Di chuyển',
    HEART_BEAT: 'Nhịp tim',
  },
  ROUTE: {
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
  LIGHT_ORANGE: '#ffa938',
  BLACK: '#000000',
  ORANGE: '#F9593A',
  GREEN: '#0bb895',
  LIGHT_GREEN: '#0FD186',
  BLUE: '#047AFF',
  WHITE: '#fff',
  LIGHT_BLUE: '#3DBBED',
  GRAY_DECOR: '#cccccc',
  GRAY_TEXT_1: '#cccccc',
  GRAY_TEXT_2: '#999999',
  EVENT_TAG: {
    Medicine: {
      backgroundColor: '#fff',
      borderColor: '#005580',
      textColor: '#005580'
    },
    Visited: {
      backgroundColor: '#fff',
      borderColor: '#009933',
      textColor: '#009933'
    },
  },
}
export const FONT_SIZE = {
  TINY: 12,
  CONTENT: 14,
  TITLE: 18,
  HEADER: 22,
  BIG_HEADER: 28,
  HEADER_TAG: 16
}

export const TEXT_STYLES = {
  HEADER: { fontSize: FONT_SIZE.HEADER, fontWeight: '500' },
}
export const ICON_SIZE = {
  HEADER: 23,
}
export const STYLES = {
  shadow: {
    shadowColor: COLORS.BLACK,
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
  // DATE = 'Date',
  VISITED = 'Visited',
  // LOCATION = 'Location',
  ALL = 'All',
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

export enum TimeUnit {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
}
export interface Medicine {
  _id: number,
  visitedId: number,
  title: string,
  // isDone: boolean,
  remind: Array<Remind>,
  start: number,
  during: number
}

export interface Remind {
  time: string,
  descript?: string,
  repeat?: boolean,
  amount?: string,
}
export interface Visited {
  _id: number,
  title: string,
  pre: number,//id of pre visited
  location: string,
  descript: string,
  date: number,
  medicines?: Array<Medicine>
}

export interface HEvent {
  date: Date,
  event: Array<HEventMedicine | HEventVisited>
}
export interface HEventMedicine {
  _id: number,
  title: string,
  type: EventType.MEDICINE,
  visitedId: number,
  time: Date,
  date: Date,
  amount?: string,
  descript?: string,
}
export interface HEventVisited {
  _id: number,
  title: string,
  type: EventType.VISITED,
  location?: string,
  descript?: string,
  date: Date,
}

export const CALENDAR_STYLES = {
  VISITED: { key: 'Visited', color: COLORS.EVENT_TAG.Visited.borderColor, selectedDotColor: 'blue' },
  MEDICINE: { key: 'Medicine', color: COLORS.EVENT_TAG.Medicine.borderColor, selectedDotColor: 'blue' },
}

export const DIMENS = {
  MARGIN_HORIZONTAL: 8,
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
  STATUS_BAR_HEIGHT: statusBarHeight,
  HEADER_STATUS_BAR_HEIGHT: statusBarHeight + 50,
  HEADER_HEIGHT: 50
}

export const TIMING = {
  HEADER_ALERT_SLIDE: 100,
  HEADER_ALERT_ALIVE_DEFAULT: 1100,
}
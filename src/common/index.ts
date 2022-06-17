import { Dimensions, Platform } from "react-native";
import { getStatusBarHeight } from "../utils/IPhoneXHelper";
const { height, width } = Dimensions.get('window')
const statusBarHeight = getStatusBarHeight(true);

export const isIOS = Platform.OS == 'ios'
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
  REPORT_TAB: {
    FOOT_STEP: "Bước chân",
    SEE_MORE: "Xem thêm",
    SOME_PRODUCTS_FOR_YOU: "Một số sản phẩm phù hợp cho bạn",
    SLEEP: "Ngủ",
    HEART_RATE: "Nhịp tim",
    PRACTICE_HISTORY: "Lịch sử luyện tập",
    WEIGHT_HEIGHT: "Chiều cao, cân nặng"
  },
  MEDICINE_SCREEN: {
    TITLE: 'Thuốc',
    DAY: 'ngày',
    WEEK: 'tuần',
    MONTH: 'tháng',
    TIME_REMIND_DO_NOT_DUPLICATE: 'Thời gian nhắc nhở không được trùng nhau',
    THE_NAME_OF_DRUG_CANNOT_BE_LEFT_BLANK: 'Không được để trống tên thuốc',
    MEDICINE_NAME: "Tên thuốc ...",
    ADD_REMIND: "Thêm nhắc nhở",
    LAST: "Uống trong",
  },
  VISITED_SCREEN: {
    TITLE: 'Lần khám',
    LAST_VISITED: 'Lần Khám trước',
    THE_NAME_OF_EXAMINATION_CANNOT_BE_LEFT_BLANK: 'Không được để trống tên lần khám',
    VISITED_NAME: "Tên lần khám ...",
    LOCATION: "Địa điểm",
    EX_DAY: "Ngày khám",
    ADD_MEDICINE: "Thêm thuốc",
    NOTE: "Ghi chú",
    DO_NOT_HAVE: "Không có",
  },
  PRACTICE_TAB: {
    TITLE: {
      OVER_VIEW: 'Tổng quan',
      MOVING: 'Di chuyển',
      JOGING: 'Đi bộ',
      CYCLING: "Đạp xe",
      HEART_BEAT: 'Nhịp tim',
    },
  },
  ROUTE: {
    MAIN_TABS: {
      PRACTICE: 'Practice',
      DIARY: 'Diary',
      PROFILE: 'Profile',
      REPORT: 'Report'
    },
    DIARY: { MEDICINE: 'Medicine', VISITED: 'Visited' },
    TAB_NAVIGATOR: 'TabNavigator',
    SEARCH: 'Search',
    REPORT_DETAIL: "ReportDetail",
    AUTH: {
      LOGIN: 'Login',
      REGISTER: 'Register',
      FORGOT_PASSWORD: 'ForgotPasswordScreen',
      VERIFY_OTP: 'VerifyOTP',
      REGISTER_FINISH: 'RegisterFinish',
    },
  },
  NOTIFICATION_ACTION: {
    OK: "OK",
  },
  STORAGE_KEY: {
    OPENED_NOTIFICATION: "OPENED_NOTIFICATION",
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
  LIGHT_GREEN: '##00c474',
  BLUE: '#007fff',
  PURPLE: "#9032ff",
  WHITE: '#fff',
  LIGHT_BLUE: '#2db6eb',
  LIGHT_BLUE_1: '#e8f7fd',
  DARK_BLUE: '#182537',
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
  TRANSPARENTS: "rgba(0, 0, 0, 0)"
}
export const FONT_SIZE = {
  TINY: 12,
  CONTENT: 14,
  TITLE: 18,
  HEADER: 22,
  BIG_HEADER: 20,
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
  HEADER_STATUS_BAR_HEIGHT: 50,
  HEADER_HEIGHT: 50
}

export const TIMING = {
  HEADER_ALERT_SLIDE: 100,
  HEADER_ALERT_ALIVE_DEFAULT: 1100,
}

export const CHANNEL_ID = {
  MEDICINE: "meidicineChannelId"
}

export const CHANNEL_NAME = {
  MEDICINE: 'medicineChannel'
}

export const TIMEOUT_NOTIFI = 30000

export const ACTIVE_OPACITY = 0.6

export const EVENT_ACTION = {
  CREATE_NEW: "CREATE_NEW",
  SHOW_INFOR: "SHOW_INFOR",
}

export const ROUTE_KEY_PARAM = {
  VISITED_ACTION: "VISITED_ACTION",
}

export const IMG_SOURCE = {
  IMG_MAP: require('../../assets/images/img_map.png')
}


export const STORAGE_KEY = {
  IS_LOGIN: 'IS_LOGIN',
  TOKEN: 'TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
}
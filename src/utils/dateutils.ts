/**Check someDate is today */
export const isToday = (someDate: Date | number): boolean => {
  const today = new Date();
  return isEqualDay(someDate, today);
};

/**check same day */
export const isEqualDay = (
  someDate1: Date | number,
  someDate2: Date | number,
): boolean => {
  // console.log(`someDate12 - isEqualDay - utils`, someDate1, someDate2)
  var someDate1Temp = new Date(someDate1);
  var someDate2temp = new Date(someDate2);
  return (
    someDate1Temp.getDate() == someDate2temp.getDate() &&
    someDate1Temp.getMonth() == someDate2temp.getMonth() &&
    someDate1Temp.getFullYear() == someDate2temp.getFullYear()
  );
};

/**check is curr month-year */
export const isCurrMonth = (someDate: Date | number): boolean => {
  const today = new Date();
  return (
    new Date(someDate).getMonth() === today.getMonth() &&
    new Date(someDate).getFullYear() == today.getFullYear()
  );
};

/**check someDate1 and someDate2 are in the same month*/
export const isThisMonth = (
  someDate1: Date | number,
  someDate2: Date | number,
): boolean => {
  const date1 = new Date(someDate1);
  const date2 = new Date(someDate2);
  return (
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() == date2.getFullYear()
  );
};

/**
 * check 1 is pre month-year of 2
 */
export const isPreMonth = (
  someDate1: Date | number,
  someDate2: Date | number,
): boolean => {
  const date1 = new Date(someDate1);
  const date2 = new Date(someDate2);

  if (
    date1.getMonth() + 1 === date2.getMonth() &&
    date1.getFullYear() == date2.getFullYear()
  )
    return true;
  if (
    date1.getMonth() == 12 &&
    date2.getMonth() == 1 &&
    date1.getFullYear() + 1 == date2.getFullYear()
  )
    return true;
  return false;
};

/**
 * check 1 is next month-year of 2
 */
export const isNextMonth = (
  someDate1: Date | number,
  someDate2: Date | number,
): boolean => {
  const date1 = new Date(someDate1);
  const date2 = new Date(someDate2);

  if (
    date1.getMonth() - 1 === date2.getMonth() &&
    date1.getFullYear() == date2.getFullYear()
  )
    return true;
  if (
    date1.getMonth() == 1 &&
    date2.getMonth() == 12 &&
    date1.getFullYear() == date2.getFullYear() + 1
  )
    return true;
  return false;
};

/**Caculate day in week */
export const calDayWeek = (someDate: Date | number): string => {
  const order = new Date(someDate).getUTCDay();
  switch (order) {
    case 0:
      return 'CN';
    default:
      return `Th ${order + 1}`;
  }
};

/**find index of some day in an array,
 * @param someDate ngày cần tìm
 * @param arr mảng này chứa các object có dạng: {date:Date,.......}
 */
export const findSomeDay = (someDate: Date, arr: Array<Object>): number => {
  // @ts-ignore
  return arr.findIndex(element => isEqualDay(element.date, someDate));
};

/**
 * get hours:minutes
 */
export const getHoursMinutes = (date: Date | number): string => {
  var newDate = new Date(date);
  let minute = newDate.getMinutes();
  let hour = newDate.getHours();
  return (
    '' +
    (hour < 10 ? `0${hour}` : hour) +
    ':' +
    (minute < 10 ? `0${minute}` : minute)
  );
};

/**
 * split hour minute
 */
export const splitHoursMinutes = (hm: string) => {
  const hoursMinutes = hm.split(':');
  return {hours: parseInt(hoursMinutes[0]), minutes: parseInt(hoursMinutes[1])};
};

/**
 * set time minutes
 * @param date
 * @param hm hours, minutes in format hh:mm string
 */

export const setHoursMinutes = (date: Date | number, hm: string) => {
  var newDate = new Date(date);
  const {hours, minutes} = splitHoursMinutes(hm);
  newDate.setHours(hours);
  newDate.setMinutes(minutes);
  newDate.setSeconds(0);
  return newDate;
};

/**
 * get date:Date
 * @param date date in milisecond
 * @returns Date
 */
export const getDateTime = (date: number | Date): Date => {
  return new Date(date);
};

/**
 * add days
 * @param date start date
 * @param days num days
 * @returns last day
 */
export const addDays = (date: number | Date, days: number) => {
  let curDate = new Date(date);
  curDate.setDate(curDate.getDate() + days);
  return curDate;
};

/**
 * add time
 * @param date date
 * @param time time add
 * @returns date with true time
 */
export const addTime = (
  date: number | Date,
  hour: number,
  minute?: number,
  second?: number,
) => {
  let curDate = new Date(date);
  curDate.setHours(curDate.getHours() + hour);
  if (minute != undefined) curDate.setMinutes(curDate.getMinutes() + minute);
  if (second != undefined) curDate.setSeconds(curDate.getSeconds() + second);
  return curDate;
};

/**
 * get current time in some area
 */
export function getCurrentLocalTime(param: 'VN' | ''): Date {
  let now = new Date();
  switch (param) {
    case 'VN':
      now = addTime(now, 7);
      break;
    default:
      now = addTime(now, 7);
      break;
  }
  return now;
}

/**
 * show date
 */
export const showDate = (date: number | Date = Date.now()) => {
  return new Date(date).toString().slice(0, 10);
};

/**
 * show time
 */
export const showTime = (date: number | Date = Date.now()) => {
  return new Date(date).toString().slice(16, 21);
};

/**
 * show date time
 */
export const showDateTime = (date: number | Date = Date.now()) => {
  const temp = new Date(date).toString();
  return temp.slice(0, 10) + '  ' + temp.slice(16, 21);
};

export const showFullDate = (date: number | Date = Date.now()) => {
  try {
    const temp = new Date(date).toISOString();
    return temp.slice(0, 10);
  } catch (error) {
    return 'chưa khởi tạo';
  }
};

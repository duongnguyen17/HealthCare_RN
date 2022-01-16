

/**Check someDate is today */
export const isToday = (someDate: Date | number): boolean => {
    const today = new Date()
    return isEqualDay(someDate, today)
}
/**check same day */
export const isEqualDay = (someDate1: Date | number, someDate2: Date | number): boolean => {
    // console.log(`someDate12 - isEqualDay - utils`, someDate1, someDate2)
    var someDate1Temp = new Date(someDate1)
    var someDate2temp = new Date(someDate2)
    return someDate1Temp.getDate() == someDate2temp.getDate() &&
        someDate1Temp.getMonth() == someDate2temp.getMonth() &&
        someDate1Temp.getFullYear() == someDate2temp.getFullYear()
}
/**check is curr month-year */
export const isCurrMonth = (someDate: Date | number): boolean => {
    const today = new Date()
    return new Date(someDate).getMonth() === today.getMonth() &&
        new Date(someDate).getFullYear() == today.getFullYear()
}
/**Caculate day in week */
export const calDayWeek = (someDate: Date | number): string => {
    const order = new Date(someDate).getUTCDay();
    switch (order) {
        case 0:
            return 'CN'
        default:
            return `Th ${order + 1}`
    }
}

/**find index of some day in an array, 
 * @param someDate ngày cần tìm
 * @param arr mảng này chưa các object có dạng: {date:Date,.......}
*/
export const findSomeDay = (someDate: Date, arr: Array<Object>): number => {
    // @ts-ignore
    return arr.findIndex((element) => isEqualDay(element.date, someDate))
};



/**
 * get hours:minutes
 */
export const getHoursMinutes = (date: Date | number): string => {
    var newDate = new Date(date)
    return '' + newDate.getHours() + ':' + newDate.getMinutes()
}

/**
 * split hour minute
 */
export const splitHoursMinutes = (hm: string) => {
    const hoursMinutes = hm.split(':');
    return { hours: parseInt(hoursMinutes[0]), minutes: parseInt(hoursMinutes[1]) }
}

/**
 * set time minutes
 * @param date
 * @param hm hours, minutes in format hh:mm string
 */

export const setHoursMinutes = (date: Date | number, hm: string) => {
    var newDate = new Date(date)
    const { hours, minutes } = splitHoursMinutes(hm)

    newDate.setHours(hours)
    newDate.setMinutes(minutes)
    return newDate
}
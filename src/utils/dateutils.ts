

/**Check someDate is today */
export const isToday = (someDate: Date): boolean => {
    const today = new Date()
    return isEqualDay(someDate, today)
}
/**check same day */
export const isEqualDay = (someDate1: Date, someDate2: Date): boolean => {
    // console.log(`someDate12 - isEqualDay - utils`, someDate1, someDate2)
    return someDate1.getDate() == someDate2.getDate() &&
        someDate1.getMonth() == someDate2.getMonth() &&
        someDate1.getFullYear() == someDate2.getFullYear()
}
/**check is curr month-year */
export const isCurrMonth = (someDate: Date): boolean => {
    const today = new Date()
    return someDate.getMonth() === today.getMonth() &&
        someDate.getFullYear() == today.getFullYear()
}
/**Caculate day in week */
export const calDayWeek = (someDate: Date): string => {
    const order = someDate.getUTCDay();
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
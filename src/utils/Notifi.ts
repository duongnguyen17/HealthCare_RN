import PushNotification, { PushNotificationScheduleObject } from "react-native-push-notification";
import { AlertType, CHANNEL_ID, Medicine, TIMEOUT_NOTIFI, Visited } from "../common";
import { showAlert } from "../components/HAlert";
import { addDays, setHoursMinutes } from "./dateutils";


const NotifiSchedule = {
    create: function (details: PushNotificationScheduleObject) {
        PushNotification.localNotificationSchedule(details)
    },
    delete: function (id: number) {

    },
    update: function (medicine: Medicine) {

    },
    /**
     * xoá các thông báo
     */
    removeAllDeliveredNotifications: function () {
        PushNotification.removeAllDeliveredNotifications()
    },
    genNotifiMedicine,
    genNotifiVisited,
}

function genNotifiMedicine(medicine: Medicine) {
    let reminds = medicine.remind
    let now = Date.now()
    if (reminds.length == 0 || addDays(medicine.start, medicine.during).getTime() - now < 0) {
        console.log("Không cần tạo remind")
        showAlert(AlertType.WARN, "Không có nhắc nhở nào được tạo")
        return
    } else {
        let notifiObject: PushNotificationScheduleObject = {
            repeatTime: 1,
            allowWhileIdle: false,
            message: medicine.title,
            date: new Date(),
            channelId: CHANNEL_ID.MEDICINE,
            timeoutAfter: TIMEOUT_NOTIFI,
            playSound: true,
            vibrate: true,
            vibration: 300,
        }
        reminds.forEach((value, index) => {
            let during = value.repeat ? medicine.during : 0
            for (let i = during; i > 0; i--) {
                let date = addDays(now, --i)
                date = setHoursMinutes(date, value.time)
                if (date.getTime() - now > 0) {
                    notifiObject.date = date
                    NotifiSchedule.create(notifiObject)
                }
            }
        })
    }
}

function genNotifiVisited(visited: Visited) {
    let now = Date.now()
    if (new Date(visited.date).getTime() - now < 0) {
        console.log("Không cần tạo nhắc nhở")
        showAlert(AlertType.WARN, "Không có nhắc nhở nào được tạo")
        return
    } else {
        let notifiObject: PushNotificationScheduleObject = {
            repeatTime: 1,
            allowWhileIdle: false,
            message: visited.title,
            date: new Date(visited.date),
            channelId: CHANNEL_ID.MEDICINE,
            timeoutAfter: TIMEOUT_NOTIFI,
            playSound: true,
            vibrate: true,
            vibration: 300,
        }
        NotifiSchedule.create(notifiObject)
    }
}


export default NotifiSchedule
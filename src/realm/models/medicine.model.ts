import { SCHEMA } from "../common";

export const MedicineSchema = {
    name: SCHEMA.MEDICINE,
    properties: {
        _id: 'int',
        title: 'string',
        infor: 'PicNote',
        schedules: 'Schedule[]',
    },
    primaryKey: '_id'
}


export const ScheduleSchema = {
    name: SCHEMA.SCHEDULE,
    embedded: true, // default: false
    properties: {
        visitedId: 'double?',
        remind: 'Remind[]',
        start: 'double?',
        during: 'double?',
    }
}

export const RemindSchema = {
    name: SCHEMA.REMIND,
    embedded: true, // default: false
    properties: {
        time: 'string?',
        descript: 'string?',
        repeat: 'bool?',
        amount: 'string?',
    }
}
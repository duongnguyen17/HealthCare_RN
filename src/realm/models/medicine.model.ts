import { SCHEMA } from "../common";

export const MedicineSchema = {
    name: SCHEMA.MEDICINE,
    properties: {
        _id: 'int',
        visitedId: 'int',
        title: 'string',
        // isDone: 'bool',
        remind: 'Remind[]',
        start: 'date',
        during: 'double'
    },
    primaryKey: '_id'
}

export const RemindSchema = {
    name: SCHEMA.REMIND,
    embedded: true, // default: false
    properties: {
        time: 'string',
        descript: 'string',
        repeat: 'bool',
        amount: 'string',
    }
}
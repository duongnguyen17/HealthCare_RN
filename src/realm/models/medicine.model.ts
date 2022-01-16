import { SCHEMA } from "../common";

export const MedicineSchema = {
    name: SCHEMA.MEDICINE,
    properties: {
        _id: 'int',
        visitedId: 'double',
        title: 'string',
        // isDone: 'bool',
        remind: 'Remind[]',
        start: 'double',
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
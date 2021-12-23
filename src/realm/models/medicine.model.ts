import { SCHEMA } from "../common";

export const MedicineSchema = {
    name: SCHEMA.MEDICINE,
    properties: {
        _id: 'int',
        visitId: 'int',
        title: 'string',
        isDone: 'bool',
        remind: '{}',
        start: 'date',
        during: 'double'
    },
    primaryKey: '_id'
}
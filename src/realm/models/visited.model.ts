import { SCHEMA } from "../common";

export const VisitedSchema = {
    name: SCHEMA.VISITED,
    properties: {
        _id: 'int',
        // userId: `int`,
        title: 'string',
        pre: `double?`,//id of pre visited
        location: 'double?',
        descript: 'string?',
        date: 'double',
        medicines: 'double[]',
        prescription: 'PicNote?',
        xRay: 'PicNote?',
        test: 'PicNote?',
    },
    primaryKey: '_id'
}

export const PicNoteSchema = {
    name: SCHEMA.PICNOTE,
    embedded: true, // default: false
    properties: {
        pictures: 'string?[]',
        note: 'string?',
    }
}
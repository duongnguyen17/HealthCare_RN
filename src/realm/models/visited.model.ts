import { SCHEMA } from "../common";

export const VisitedSchema = {
    name: SCHEMA.VISITED,
    properties: {
        _id: 'int',
        // userId: `int`,
        title: 'string',
        pre: `int?`,//id of pre visited
        location: 'string?',
        descript: 'string?',
        date: 'double',
    },
    primaryKey: '_id'
}
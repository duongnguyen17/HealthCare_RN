import { SCHEMA } from "../common";

export const LocationSchema = {
    name: SCHEMA.LOCATION,
    properties: {
        _id: 'int',
        // userId: `int`,
        name: 'string',
    },
    primaryKey: '_id'
}